import { Request, Response, Router } from 'express';
import { getUser } from '../controllers/user';

import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * http//localhost:3001/transactions
 */

router.get('/:id', checkJWT, getUser);

router.put('/:id', checkJWT);

router.delete('/:id', checkJWT);

export { router };
