import { Account } from '../interfaces/account.interface';
import AccountModel from '../models/account';
import TransactionModel from '../models/transaction';
import UserModel from '../models/user';

const findAccountById = async (id: string) => {
  const accountResponse = await AccountModel.findById(id).populate({
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
  id: string
) => {
  const oldAccountData = await AccountModel.findById(id);
  if (!oldAccountData) throw new Error('ACCOUNT_NOT_FOUND');

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
  const accountResponse = await AccountModel.findById(id);
  if (!accountResponse) throw new Error('ACCOUNT_NOT_FOUND');

  //first check if the account property "from" is same as the user._id

  if (accountResponse.from.toString() !== user._id) {
    throw new Error('YOU_DONT_HAVE_PERMISSIONS');
  }

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

export { findAccountById, createAccount, updateAccount, deleteAccount };
