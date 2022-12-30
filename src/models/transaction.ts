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
      ref: 'accounts',
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    category: {
      type: Schema.Types.Mixed,
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
      enum: ['ADDITION', 'SUBSTRACTION'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TransactionModel = model('transaction', TransactionSchema);

export default TransactionModel;
