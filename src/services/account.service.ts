import { Account } from '../interfaces/account.interface';
import AccountModel from '../models/account';
import TransactionModel from '../models/transaction';
import UserModel from '../models/user';
import { isAuthorized } from '../utils/isAuthorized.handler';

const findAllAccounts = async ({ user }: any) => {
  const { _id } = user;
  let accountResponse = await AccountModel.find({
    created_by: _id,
  }).populate({
    path: 'transactions',
  });
  return accountResponse;
};

const findAccountById = async ({ user }: any, id: string) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  let accountResponse = await isAuthorized(AccountModel, id, user._id);
  accountResponse = await accountResponse.populate({
    path: 'transactions',
  });

  return accountResponse;
};

const createAccount = async (
  {
    name,
    description,
    balance,
    currency,
    type,
    tags,
    color,
    shared_with,
  }: Account,
  { user }: any
) => {
  const account = {
    name: name,
    description: description,
    balance: balance || 0,
    currency: currency,
    type: type,
    tags: tags || null,
    color: color || 'red',
    from: user._id,
    shared_with: shared_with || [],
    transactions: [], // Array with id of traansactions
  };
  const accountResponse = await AccountModel.create(account);
  await UserModel.findByIdAndUpdate(user._id, {
    $push: { accounts: accountResponse._id },
  });
  return accountResponse;
};

const updateAccount = async (
  {
    name,
    description,
    balance,
    currency,
    type,
    tags,
    color,
    shared_with,
  }: Account,
  { user }: any,
  id: string
) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const oldAccountData = await isAuthorized(AccountModel, id, user._id);

  const updatedAccount = {
    name: name || oldAccountData.name,
    description: description || oldAccountData.description,
    balance: balance || oldAccountData.balance,
    currency: currency || oldAccountData.currency,
    type: type || oldAccountData.type,
    tags: tags || oldAccountData.tags,
    color: color || oldAccountData.color,
    shared_with: shared_with || oldAccountData.shared_with,
  };

  const accountResponse = await AccountModel.findByIdAndUpdate(
    id,
    updatedAccount,
    { new: true }
  );

  return accountResponse;
};

const deleteAccount = async ({ user }: any, id: string) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const accountResponse = await isAuthorized(AccountModel, id, user._id);

  //If the account have transaction then will be deleted
  let transactionsToDelete = accountResponse.transactions;
  console.log(accountResponse);
  console.log(accountResponse.transactions);

  if (transactionsToDelete && transactionsToDelete.length > 0) {
    for (let i = 0; i < transactionsToDelete.length; i++) {
      const transaction = transactionsToDelete[i];
      await TransactionModel.findByIdAndRemove(transaction);
    }
  }

  // delete the account of array accounts in user
  await UserModel.findByIdAndUpdate(user._id, {
    $pull: { accounts: id },
  });

  const removedAccountRepsonse = await AccountModel.findByIdAndRemove(id);

  return removedAccountRepsonse;
};

export {
  findAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  findAllAccounts,
};
