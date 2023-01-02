import { AccountList } from '../enums/account.enum';
import { CurrencyList } from '../enums/currency.enum';
import { Account } from '../interfaces/account.interface';
import { Schema, Types, Model, model } from 'mongoose';

export const createBasicAccount = (userId: object) => {
  const basicAccount: Account = {
    name: 'Basic Account',
    description: 'Your first account. If you like edit push edit button',
    balance: 0,
    initial_balance: 0,
    total_expenses: 0,
    total_income: 0,
    currency: CurrencyList.ARS,
    type: AccountList.CASH,
    tags: null,
    color: 'blue',
    created_by: userId,
    shared_with: null,
    transactions: [],
  };
  return basicAccount;
};
