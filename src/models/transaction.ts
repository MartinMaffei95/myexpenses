import { Schema, Types, Model, model } from 'mongoose';
import { Transaction } from '../interfaces/transaction.interface';
import { formatingToDateJs } from '../utils/dayjs.formater';

const TransactionSchema = new Schema<Transaction>(
  {
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    family: {
      type: String,
      required: true,
    },
    sub_family: {
      type: String,
      default: undefined,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TransactionModel = model('transaction', TransactionSchema);

export default TransactionModel;
