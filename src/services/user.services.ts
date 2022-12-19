import { categories } from '../config/categories';
import UserModel from '../models/user';

const getMyUserData = async (id: string) => {
  const userData = await UserModel.findById(id);

  if (userData) {
    userData.categories = categories;
    const user = { ...userData.toObject(), categories };
    return user;
  } else return null;
};

export { getMyUserData };
