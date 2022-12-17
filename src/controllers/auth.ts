import { Request, response, Response } from 'express';
import { handleHttp } from '../utils/error.handler';
import { registerNewUser, loginUser } from '../services/auth.services';

const registerController = async ({ body }: Request, res: Response) => {
  try {
    const responseUser = await registerNewUser(body);
    res.send(responseUser);
  } catch (e) {
    handleHttp(res, 'ERROR_REGISTER', e);
  }
};

const loginController = async ({ body }: Request, res: Response) => {
  try {
    const responseUser = await loginUser(body);
    if (responseUser === 'WRONG_CREDENTIALS') {
      res.status(403);
      res.send(responseUser);
    } else {
      res.send(responseUser);
    }
  } catch (e) {
    handleHttp(res, 'ERROR_LOGIN', e);
  }
};

export { registerController, loginController };
