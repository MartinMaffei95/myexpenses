import { Request, response, Response } from 'express';
import RequestExt from '../interfaces/RequestExt.interface';
import {
  getMyUserData,
  editMyUserData,
  changeMyPassword,
  deleteMyUser,
  createCategory,
} from '../services/user.services';
import { handleHttp } from '../utils/error.handler';

const getUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const userData = await getMyUserData(id);
    console.log(userData);
    res.send(userData);
  } catch (e) {
    handleHttp(res, 'USER_NOT_FOUND', e);
  }
};

const editUser = async ({ body, user, params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const userData = await editMyUserData(body, user, id);
    res.send(userData);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATING_USER', e);
  }
};

const changePassword = async (
  { body, user, params }: RequestExt,
  res: Response
) => {
  try {
    const { id } = params;
    const userData = await changeMyPassword(body, user, id);
    res.send(userData);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATING_PASS', e);
  }
};

const deleteUser = async (
  { body, user, params }: RequestExt,
  res: Response
) => {
  try {
    const { id } = params;
    const userData = await deleteMyUser(body, user, id);
    res.send(userData);
  } catch (e) {
    handleHttp(res, 'ERROR_DELETING_USER', e);
  }
};

const addCategory = async ({ body, user }: RequestExt, res: Response) => {
  try {
    const categoryData = await createCategory(body, user);
    console.log(categoryData);
    res.send(categoryData);
  } catch (e) {
    handleHttp(res, 'ERROR_CREATING_CATEGORIES', e);
  }
};

export { getUser, editUser, changePassword, deleteUser, addCategory };
