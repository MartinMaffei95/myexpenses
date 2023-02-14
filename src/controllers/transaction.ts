import { Request, Response } from 'express';
import RequestExt from '../interfaces/RequestExt.interface';
import {
  getAllTransactions,
  insertTransaction,
  getTransactionByQuery,
  updateTransactionData,
  deleteTransactionData,
  transferTransaction,
} from '../services/transactions.service';
import { handleHttp } from '../utils/error.handler';

// const getTransaction = async ({ params }: Request, res: Response) => {
//   try {
//     const { id } = params;
//     const response_transaction = await getTransactionById(id);
//     res.send(response_transaction);
//   } catch (e) {
//     handleHttp(res, 'ERROR_GET_TRANSACTION', e);
//   }
// };

const getTransactions = async ({ user }: RequestExt, res: Response) => {
  try {
    const response_transactions = await getAllTransactions(user);
    res.send(response_transactions);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_TRANSACTIONS', e);
  }
};

const postTransaction = async ({ body, user }: RequestExt, res: Response) => {
  try {
    const response_transaction = await insertTransaction(body, user);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_POST_TRANSACTION', e);
  }
};

const getQueryTransactions = async (
  { query, user }: RequestExt,
  res: Response
) => {
  try {
    const response_transaction = await getTransactionByQuery(query, user);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_SEARCHING', e);
  }
};

const updateTransaction = async (
  { params, body, user }: RequestExt,
  res: Response
) => {
  try {
    const { id } = params;
    const response_transaction = await updateTransactionData(id, body, user);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_TRANSACTION', e);
  }
};

const deleteTransaction = async (
  { params, user }: RequestExt,
  res: Response
) => {
  try {
    const { id } = params;
    const response_transaction = await deleteTransactionData(id, user);
    res.send('Se eliminó un registro');
  } catch (e) {
    handleHttp(res, 'ERROR_REMOVE_TRANSACTION', e);
  }
};

const makeTransference = async ({ body, user }: RequestExt, res: Response) => {
  try {
    const response_transaction = await transferTransaction(body, user);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_POST_TRANSACTION', e);
  }
};

export {
  getTransactions,
  getQueryTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
  makeTransference,
};
