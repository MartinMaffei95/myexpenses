import { Schema, Types, Model, model } from 'mongoose';
import { Transaction } from '../interfaces/transaction.interface';
import { formatingToDateJs } from '../utils/dayjs.formater';

const TransactionSchema = new Schema<Transaction>(
  {
    value: {
      type: Number,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'account',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    comment: {
      type: String,
      default: undefined,
    },
    transaction_date: {
      type: String,
      default: formatingToDateJs(new Date()),
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['addition', 'substraction'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TransactionModel = model('transaction', TransactionSchema);

export default TransactionModel;
