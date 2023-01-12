import { Response } from 'express';
import RequestExt from '../interfaces/RequestExt.interface';
import {
  createCategory,
  deleteOneCategory,
  editCategoryData,
} from '../services/category.services';
import { handleHttp } from '../utils/error.handler';

const addCategory = async ({ body, user }: RequestExt, res: Response) => {
  try {
    const categoryData = await createCategory(body, user);
    res.send(categoryData);
  } catch (e) {
    handleHttp(res, 'ERROR_CREATING_CATEGORIES', e);
  }
};

const editCategory = async (
  { body, user, params }: RequestExt,
  res: Response
) => {
  try {
    const { id } = params;
    const userData = await editCategoryData(body, user, id);
    res.send(userData);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATING_CATEGORIES', e);
  }
};

const deleteCategory = async ({ user, params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const userData = await deleteOneCategory(user, id);
    res.send('CATEGORY_DELETED');
  } catch (e) {
    handleHttp(res, 'ERROR_DELETING_CATEGORY', e);
  }
};

export { addCategory, editCategory, deleteCategory };
