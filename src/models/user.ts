import { Schema, Types, Model, model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accounts: [
      {
        type: Types.ObjectId,
        default: [],
        ref: 'accounts',
      },
    ],
    my_categories: [
      {
        type: Types.ObjectId,
        default: [],
        ref: 'category',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model('users', UserSchema);

export default UserModel;
