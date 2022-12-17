import { Request, Response, Router } from 'express';
import {
  deleteTransaction,
  getQueryTransactions,
  getTransaction,
  getTransactions,
  postTransaction,
  updateTransaction,
} from '../controllers/transaction';
import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * http//localhost:3001/transactions
 */

router.get('/all', checkJWT, getTransactions);

router.get('/:id', checkJWT, getTransaction);

router.get('/?', checkJWT, getQueryTransactions);

router.post('/', checkJWT, postTransaction);

router.put('/:id', checkJWT, updateTransaction);

router.delete('/:id', checkJWT, deleteTransaction);

export { router };
