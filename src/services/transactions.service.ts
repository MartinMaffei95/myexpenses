import { Transaction } from '../interfaces/transaction.interface';
import AccountModel from '../models/account';
import TransactionModel from '../models/transaction';
import { createQuery } from '../utils/createQuery.handler';
import { isAuthorized } from '../utils/isAuthorized.handler';

const insertTransaction = async (transaction: Transaction, { user }: any) => {
  const account_id = transaction.account.toString();

  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  let accountResponse = await isAuthorized(AccountModel, account_id, user._id);

  const newTransaction = { ...transaction, created_by: user._id };
  const responseInsert = await TransactionModel.create(newTransaction);

  switch (transaction.type) {
    case 'SUBSTRACTION':
      await accountResponse.update({
        $inc: {
          balance: -transaction.value,
        },
        $push: { transactions: responseInsert._id },
      });

      return responseInsert;
      break;

    case 'ADDITION':
      await accountResponse.update({
        $inc: {
          balance: transaction.value,
        },
        $push: { transactions: responseInsert._id },
      });

      return responseInsert;
      break;
    default:
      break;
  }
};

const getAllTransactions = async ({ user }: any) => {
  const { _id } = user;
  const responseTransactions = await TransactionModel.find({
    created_by: _id,
  });
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
  id: string,
  transaction: Transaction,
  { user }: any
) => {
  const account_id = transaction.account.toString();
  //This check if the file exists in account collection and if the client - who send the request - have authorization to used
  await isAuthorized(AccountModel, account_id, user._id);
  // Now check the same in the transaction
  let responseTransaction = await isAuthorized(TransactionModel, id, user._id);
  //Aaaaaand finally update the transaction and retur them
  responseTransaction = await responseTransaction.update(transaction, {
    new: true,
  });
  return responseTransaction;
};

const deleteTransactionData = async (id: string, user: any) => {
  let responseTransaction = await isAuthorized(TransactionModel, id, user._id);

  responseTransaction = await responseTransaction.remove();
  return responseTransaction;
};

export {
  insertTransaction,
  getAllTransactions,
  getTransactionByQuery,
  updateTransactionData,
  deleteTransactionData,
};
