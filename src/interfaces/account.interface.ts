import { AccountList } from '../enums/account.enum';
import { CurrencyList } from '../enums/currency.enum';
import { User } from './user.interface';

export interface Account {
  name: string;
  description: string;
  balance: number;
  currency: CurrencyList; // peso, dolar, euro etc
  type: AccountList; // cash, bank, credit card
  tags: [string] | null;
  color: string; //
  from: object; //user who created this account
  shared_with: [{ user: User; rol: string }] | null; // rol => admin or invited,
  transactions: [string | object] | [] | null; // Array with id of traansactions
}
