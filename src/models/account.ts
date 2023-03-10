import { Schema, Types, Model, model } from 'mongoose';
import { Account } from '../interfaces/account.interface';

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
    initial_balance: {
      type: Number,
      default: 0,

      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    total_expenses: {
      type: Number,
      default: 0,
      required: true,
    },
    total_income: {
      type: Number,
      default: 0,
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
    created_by: {
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
    transactions: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'transaction',
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
