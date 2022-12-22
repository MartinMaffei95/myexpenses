import { categories } from '../config/categories';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { isAuthorizedUser } from '../utils/isAuthorized.handler';
import { generateToken } from '../utils/jwt.handle';

const getMyUserData = async (id: string) => {
  const userData = await UserModel.findById(id);

  if (!userData) throw new Error('USER_NOT_FOUND');

  userData.categories = categories;
  const user = { ...userData.toObject(), categories };
  return user;
};

const editMyUserData = async (
  { name, username, my_categories }: User,
  { user }: any,
  id: string
) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const oldUserData = await isAuthorizedUser(UserModel, id, user._id);

  const updatedUserData = {
    name: name || oldUserData.name,
    username: username || oldUserData.username,
    password: oldUserData.password,
    my_categories: my_categories || oldUserData.my_categories,
  };

  const updatedUser = await oldUserData.update(updatedUserData, {
    new: true,
  });

  const token = await generateToken(updatedUser);
  const data = {
    token,
    user: updatedUser,
  };
  return data;
};

const changeMyPassword = async (
  { userPassword, newPassword }: any,
  { user }: any,
  id: string
) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const oldUserData = await isAuthorizedUser(UserModel, id, user._id);

  // first userPassword is the same with the actual user password
  const isCorrect = await verified(userPassword, oldUserData.password);
  if (!isCorrect) return 'THE_PASSWORD_IS_WRONG';

  //now, if is the same (isCorrect => true) then change the actual user password for the new HASHED password
  // ** hashing new pass
  const passHash = await encrypt(newPassword);

  // ** updating the password
  const updatedUserData = {
    name: oldUserData.name,
    username: oldUserData.username,
    password: passHash,
    my_categories: oldUserData.my_categories,
  };

  let updatedUser = await oldUserData.update(updatedUserData, {
    new: true,
  });

  const token = await generateToken(updatedUser);
  const data = {
    token,
    user: updatedUser,
  };
  return data;
};

const deleteMyUser = async ({ password }: any, { user }: any, id: string) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const userData = await isAuthorizedUser(UserModel, id, user._id);

  try {
    // first userPassword is the same with the actual user password
    const isCorrect = await verified(password, userData.password);
    if (!isCorrect) return 'THE_PASSWORD_IS_WRONG';

    //now, if is the same (isCorrect => true) then delete user
    await userData.remove();
    return 'USER_DELETED';
  } catch (e) {
    console.log(e);
    throw new Error('ERROR_DELETING');
  }
};

export { getMyUserData, editMyUserData, changeMyPassword, deleteMyUser };
