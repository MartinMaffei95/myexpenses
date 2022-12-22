import { Transaction } from '../interfaces/transaction.interface';
import AccountModel from '../models/account';
import TransactionModel from '../models/transaction';
import { createQuery } from '../utils/createQuery.handler';
import { account_authorized } from '../utils/isAuthorized.handler';

const insertTransaction = async (transaction: Transaction, { user }: any) => {
  const isAuthorized = await account_authorized(
    transaction.account.toString(),
    user._id
  );
  if (!isAuthorized) return;

  const newTransaction = { ...transaction, created_by: user._id };
  const responseInsert = await TransactionModel.create(newTransaction);

  switch (transaction.type) {
    case 'SUBSTRACTION':
      await AccountModel.findByIdAndUpdate(transaction.account, {
        $inc: {
          balance: -transaction.value,
        },
        $push: { transactions: responseInsert._id },
      });

      return responseInsert;
      break;

    case 'ADDITION':
      await AccountModel.findByIdAndUpdate(transaction.account, {
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

const getTransactionById = async (id: string) => {
  const responseTransactions = await TransactionModel.find({ _id: id });
  return responseTransactions;
};

const getTransactionByQuery = async (query: object, { user }: any) => {
  const { _id } = user;
  const mongoQuery = createQuery(query);
  const responseTransactions = await TransactionModel.find({
    ...mongoQuery,
    created_by: _id,
  });
  return responseTransactions;
};

const getAllTransactionsByType = async (type: string) => {
  //'substraction' or 'addition'
  const responseTransactions = await TransactionModel.find({ type: type });
  return responseTransactions;
};

const updateTransactionData = async (
  id: string,
  transaction: Transaction,
  { user }: any
) => {
  const isAuthorized = await account_authorized(
    transaction.account.toString(),
    user._id
  );
  if (!isAuthorized) return;
  const responseTransaction = await TransactionModel.findOneAndUpdate(
    { _id: id },
    transaction,
    { new: true }
  );
  return responseTransaction;
};

const deleteTransactionData = async (id: string, user: any) => {
  const transaction = await TransactionModel.findById(id);
  if (!transaction) return;
  const isAuthorized = await account_authorized(
    transaction.account.toString(),
    user._id
  );
  if (!isAuthorized) return;

  const responseTransactions = await TransactionModel.remove({ _id: id });
  return responseTransactions;
};

export {
  insertTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionByQuery,
  updateTransactionData,
  deleteTransactionData,
};
