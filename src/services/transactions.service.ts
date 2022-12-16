import { Transaction } from '../interfaces/transaction.interface';
import TransactionModel from '../models/transaction';

const insertTransaction = async (transaction: Transaction) => {
  const responseInsert = await TransactionModel.create(transaction);
  return responseInsert;
};

const getAllTransactions = async () => {
  const responseTransactions = await TransactionModel.find({});
  return responseTransactions;
};

const getTransactionById = async (id: string) => {
  const responseTransactions = await TransactionModel.find({ _id: id });
  return responseTransactions;
};

const getTransactionByQuery = async (query: object) => {
  const responseTransactions = await TransactionModel.find(query);
  return responseTransactions;
};

const getAllTransactionsByType = async (type: string) => {
  //'substraction' or 'addition'
  const responseTransactions = await TransactionModel.find({ type: type });
  return responseTransactions;
};

const updateTransactionData = async (id: string, transaction: Transaction) => {
  const responseTransaction = await TransactionModel.findOneAndUpdate(
    { _id: id },
    transaction,
    { new: true }
  );
  return responseTransaction;
};

const deleteTransactionData = async (id: string) => {
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
