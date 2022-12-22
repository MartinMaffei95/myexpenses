import { AccountList } from '../enums/account.enum';
import { CurrencyList } from '../enums/currency.enum';
import { Account } from '../interfaces/account.interface';
import { Schema, Types, Model, model } from 'mongoose';

export const createBasicAccount = (userId: object) => {
  const basicAccount: Account = {
    name: 'Basic Account',
    description: 'Your first account. If you like edit push edit button',
    balance: 0,
    currency: CurrencyList.ARS,
    type: AccountList.CASH,
    tags: null,
    color: 'blue',
    from: userId,
    shared_with: null,
    transactions: [],
  };
  return basicAccount;
};
