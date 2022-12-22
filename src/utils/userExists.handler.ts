import { User } from '../interfaces/user.interface';
import UserModel from '../models/user';

const userExists = async ({ user }: any) => {
  const userFinded = await UserModel.findById(user._id);
  if (userFinded) return true;
  return false;
};
export { userExists };
