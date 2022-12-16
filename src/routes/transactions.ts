import { Request, Response, Router } from 'express';
import {
  deleteTransaction,
  getQueryTransactions,
  getTransaction,
  getTransactions,
  postTransaction,
  updateTransaction,
} from '../controllers/transaction';

const router = Router();

/**
 * http//localhost:3001/transactions
 */

router.get('/all', getTransactions);

router.get('/:id', getTransaction);

router.get('/?', getQueryTransactions);

router.post('/', postTransaction);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

export { router };
