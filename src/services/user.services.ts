import { User } from '../interfaces/user.interface';
import UserModel from '../models/user';

const getMyUserData = async (id: string) => {
  const userData = await UserModel.find({ _id: id });
  return userData;
};

export { getMyUserData };
