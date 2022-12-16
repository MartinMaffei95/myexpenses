import { Request, Response, Router } from 'express';

const router = Router();

/**
 * http//localhost:3001/transactions
 */

router.get('/', (req: Request, res: Response) => {
  res.send({ data: 'ALL_TRANSACTIONS' });
});

export { router };
