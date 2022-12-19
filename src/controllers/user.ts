import { Request, response, Response } from 'express';
import { getMyUserData } from '../services/user.services';
import { handleHttp } from '../utils/error.handler';

const getUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const userData = await getMyUserData(id);
    res.send(userData);
  } catch (e) {
    handleHttp(res, 'USER_NOT_FOUND', e);
  }
};

export { getUser };
