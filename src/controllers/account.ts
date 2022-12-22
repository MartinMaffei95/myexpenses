import { Request, response, Response } from 'express';
import RequestExt from '../interfaces/RequestExt.interface';
import {
  createAccount,
  deleteAccount,
  findAccountById,
  updateAccount,
} from '../services/account.service';
import { handleHttp } from '../utils/error.handler';

const getAccountData = async ({ params }: Request, res: Response) => {
  const { id } = params;
  try {
    const accountResponse = await findAccountById(id);
    res.send(accountResponse);
  } catch (e) {
    handleHttp(res, 'ACCOUNT_NOT_EXISTS', e);
  }
};

const createNewAccount = async ({ body, user }: RequestExt, res: Response) => {
  try {
    const accountResponse = await createAccount(body, user);
    res.send(accountResponse);
  } catch (e) {
    handleHttp(res, 'ERROR_CREATING_ACCOUNT', e);
  }
};

const updateAccountData = async (
  { body, params }: RequestExt,
  res: Response
) => {
  const { id } = params;
  try {
    const accountResponse = await updateAccount(body, id);
    res.send(accountResponse);
  } catch (e) {
    handleHttp(res, 'ERROR_CREATING_ACCOUNT', e);
  }
};

const deleteAccountData = async (
  { user, params }: RequestExt,
  res: Response
) => {
  const { id } = params;
  try {
    const accountResponse = await deleteAccount(user, id);
    res.send(accountResponse);
  } catch (e) {
    handleHttp(res, 'ERROR_DELETING_ACCOUNT', e);
  }
};
export {
  getAccountData,
  createNewAccount,
  updateAccountData,
  deleteAccountData,
};
