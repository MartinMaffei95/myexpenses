import { Types } from 'mongoose';
import { createBasicAccount } from '../config/basicAccount';
import { User } from '../interfaces/user.interface';
import AccountModel from '../models/account';
import UserModel from '../models/user';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

const registerNewUser = async ({ username, password, name }: User) => {
  const checkIs = await UserModel.findOne({ username });
  if (checkIs) {
    return 'USERNAME_ALREADY_EXISTS';
  }
  const passHash = await encrypt(password);
  const userId = new Types.ObjectId();
  const accountToCreate = createBasicAccount(userId);
  const registeredAccount = await AccountModel.create(accountToCreate);
  const registeredUser = await UserModel.create({
    username,
    password: passHash,
    name,
    accounts: [registeredAccount],
  });
  return registeredUser;
};

const loginUser = async ({ username, password }: User) => {
  const checkIs = await UserModel.findOne({ username });
  if (!checkIs) {
    return 'WRONG_CREDENTIALS';
  }
  const passHash = checkIs.password;
  const isCorrect = await verified(password, passHash);

  if (!isCorrect) return 'WRONG_CREDENTIALS';
  const token = await generateToken(checkIs.username);
  const data = {
    token,
    user: checkIs,
  };
  return data;
};

export { registerNewUser, loginUser };
