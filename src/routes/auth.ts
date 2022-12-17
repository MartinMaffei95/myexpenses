import { Request, Response, Router } from 'express';
import { loginController, registerController } from '../controllers/auth';

const router = Router();
// http://localhost:3001/auth/register

router.post('/register', registerController);
router.post('/login', loginController);
export { router };
