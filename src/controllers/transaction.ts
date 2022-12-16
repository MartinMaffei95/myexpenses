import { Request, Response } from 'express';
import {
  getAllTransactions,
  insertTransaction,
  getTransactionById,
  getTransactionByQuery,
  updateTransactionData,
  deleteTransactionData,
} from '../services/transactions.service';
import { handleHttp } from '../utils/error.handler';

const getTransaction = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response_transaction = await getTransactionById(id);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_TRANSACTION', e);
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const response_transactions = await getAllTransactions();
    res.send({ data: response_transactions });
  } catch (e) {
    handleHttp(res, 'ERROR_GET_TRANSACTIONS', e);
  }
};

const postTransaction = async ({ body }: Request, res: Response) => {
  try {
    const response_transaction = await insertTransaction(body);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_POST_TRANSACTION', e);
  }
};

const getQueryTransactions = async ({ query }: Request, res: Response) => {
  try {
    const response_transaction = await getTransactionByQuery(query);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_POST_TRANSACTION', e);
  }
};

const updateTransaction = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response_transaction = await updateTransactionData(id, body);
    res.send(response_transaction);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_TRANSACTION', e);
  }
};

const deleteTransaction = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response_transaction = await deleteTransactionData(id);
    res.send('Se eliminó un registro');
  } catch (e) {
    handleHttp(res, 'ERROR_REMOVE_TRANSACTION', e);
  }
};

export {
  getTransaction,
  getTransactions,
  getQueryTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
