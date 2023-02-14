import { Transaction } from '../interfaces/transaction.interface';
import AccountModel from '../models/account';
import TransactionModel from '../models/transaction';
import { createQuery } from '../utils/createQuery.handler';
import { isAuthorized } from '../utils/isAuthorized.handler';
import { updateBalance } from '../utils/updateBalance';

const insertTransaction = async (transaction: Transaction, { user }: any) => {
  const account_id = transaction.account.toString();

  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to use
  let accountResponse = await isAuthorized(AccountModel, account_id, user._id);

  // Create and save transaction
  const newTransaction = { ...transaction, created_by: user._id };
  const responseInsert = await TransactionModel.create(newTransaction);

  // Now update account balance
  let allTransactions = await TransactionModel.find({
    created_by: user._id,
    account: account_id,
  });
  const { actual_balance, actual_incomes, actual_expenses } = updateBalance(
    allTransactions,
    accountResponse.initial_balance
  );

  await accountResponse.update({
    balance: actual_balance,
    total_expenses: actual_expenses,
    total_income: actual_incomes,
    $push: { transactions: responseInsert._id },
  });
  return responseInsert;
};

const getAllTransactions = async ({ user }: any) => {
  const { _id } = user;
  const responseTransactions = await TransactionModel.find({
    created_by: _id,
  }).populate([
    {
      path: 'category',
      populate: {
        path: 'sub_category',
      },
    },
    {
      path: 'account created_by',
    },
  ]);

  return responseTransactions;
};

// deprectated. u have the query find. use that with id
// const getTransactionById = async (id: string) => {
//   const responseTransactions = await TransactionModel.find({ _id: id });
//   return responseTransactions;
// };

const getTransactionByQuery = async (query: object, { user }: any) => {
  const { _id } = user;
  const mongoQuery = createQuery(query);
  const responseTransactions = await TransactionModel.find({
    ...mongoQuery,
    created_by: _id,
  });
  return responseTransactions;
};
// deprectated. u have the query find. use that with type
// const getAllTransactionsByType = async (type: string) => {
//   //'substraction' or 'addition'
//   const responseTransactions = await TransactionModel.find({ type: type });
//   return responseTransactions;
// };

const updateTransactionData = async (
  id: string, //transaction id
  transaction: Transaction, //edited transaction
  { user }: any
) => {
  const account_id = transaction.account.toString(); // new account id

  //This check if the file exists in account collection and if the client - who send the request - have authorization to use
  const accountResponse = await isAuthorized(
    AccountModel,
    account_id,
    user._id
  ); //new account

  // Now check the same in the transaction
  let responseTransaction = await isAuthorized(TransactionModel, id, user._id); //=> old transaction
  const oldAccountId = responseTransaction.account;

  //update the transaction and return them
  responseTransaction = await TransactionModel.findByIdAndUpdate(
    id,
    transaction,
    {
      new: true,
    }
  );
  // update balances of old account of transaction

  let oldAccount = await AccountModel.findById(oldAccountId);
  let allTransactionsOfOldAccount = await TransactionModel.find({
    created_by: user._id,
    account: oldAccountId,
  });
  let transactionsOfOldAccount = updateBalance(
    allTransactionsOfOldAccount,
    oldAccount?.initial_balance
  );
  await AccountModel.findByIdAndUpdate(oldAccountId, {
    balance: transactionsOfOldAccount.actual_balance,
    total_expenses: transactionsOfOldAccount.actual_expenses,
    total_income: transactionsOfOldAccount.actual_incomes,
  });

  // finally edit account and return the transaccion modified
  let allTransactions = await TransactionModel.find({
    created_by: user._id,
    account: account_id,
  });

  let transactionsOfNewAccount = updateBalance(
    allTransactions,
    accountResponse.initial_balance
  );
  await accountResponse.update({
    balance: transactionsOfNewAccount.actual_balance,
    total_expenses: transactionsOfNewAccount.actual_expenses,
    total_income: transactionsOfNewAccount.actual_incomes,
  });

  return responseTransaction;
};

const deleteTransactionData = async (id: string, { user }: any) => {
  let responseTransaction = await isAuthorized(TransactionModel, id, user._id);
  let accountResponse = await AccountModel.findById(
    responseTransaction.account
  );
  if (!accountResponse) return;
  responseTransaction = await responseTransaction.remove();

  let allTransactions = await TransactionModel.find({
    created_by: user._id,
    account: accountResponse._id,
  });
  const { actual_balance, actual_expenses, actual_incomes } = updateBalance(
    allTransactions,
    accountResponse.initial_balance
  );

  await accountResponse.update({
    balance: actual_balance,
    total_expenses: actual_expenses,
    total_income: actual_incomes,
    $pull: { transactions: responseTransaction._id },
  });
  return responseTransaction;
};

const transferTransaction = async (transaction: Transaction, { user }: any) => {
  const from_account_id = transaction?.from?.toString();
  const to_account_id = transaction?.to?.toString();

  //This check if the account exists in collectionDb and if the client - who send the request - have authorization to use
  if (!from_account_id || !to_account_id) {
    throw new Error('THE ACCOUNT NO EXIST');
  }
  // ## FROM ACCOUNT
  let fromAccountResponse = await isAuthorized(
    AccountModel,
    from_account_id,
    user._id
  );
  // ## TO ACCOUNT
  let toAccountResponse = await isAuthorized(
    AccountModel,
    to_account_id,
    user._id
  );

  // Create transactions
  const fromTransaction = {
    ...transaction,
    account: from_account_id,
    created_by: user._id,
  };
  const toTransaction = {
    ...transaction,
    account: to_account_id,
    created_by: user._id,
  };
  const responseFromTransaction = await TransactionModel.create(
    fromTransaction
  );
  const responseToTransaction = await TransactionModel.create(toTransaction);

  // Get all transactions of accounts
  let allTransactions_from_account = await TransactionModel.find({
    created_by: user._id,
    account: from_account_id,
  });

  let allTransactions_to_account = await TransactionModel.find({
    created_by: user._id,
    account: to_account_id,
  });

  // Update the balances of accounts
  // ## FROM account NEW BALANCE
  const actual_from = updateBalance(
    allTransactions_from_account,
    fromAccountResponse.initial_balance,
    from_account_id
  );
  // ## TO account NEW BALANCE
  const actual_to = updateBalance(
    allTransactions_to_account,
    toAccountResponse.initial_balance,
    to_account_id
  );

  // Update accounts balances and push the transaction

  // ## FROM ACCOUNT

  await fromAccountResponse.update({
    balance: actual_from.actual_balance,
    total_expenses: actual_from.actual_expenses,
    total_income: actual_from.actual_incomes,
    $push: { transactions: responseFromTransaction._id },
  });

  // ## TO ACCOUNT

  await toAccountResponse.update({
    balance: actual_to.actual_balance,
    total_expenses: actual_to.actual_expenses,
    total_income: actual_to.actual_incomes,
    $push: { transactions: responseToTransaction._id },
  });

  // Return data of two new transactions
  return {
    to_transference: responseToTransaction,
    from_transference: responseFromTransaction,
  };
};
export {
  insertTransaction,
  getAllTransactions,
  getTransactionByQuery,
  updateTransactionData,
  deleteTransactionData,
  transferTransaction,
};
