import { Schema, Types, Model, model } from 'mongoose';
import { Account } from '../interfaces/accounts.interface';

const AccountSchema = new Schema<Account>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        default: [],
        required: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    shared_with: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'users',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AccountModel = model('accounts', AccountSchema);

export default AccountModel;