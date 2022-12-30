import { Account } from './account.interface';
import { Auth } from './auth.interface';
import { Category } from './category.interface';

export interface User extends Auth {
  name: string;
  accounts: [Account];
  my_categories: Category[] | null | any;
  categories: Array<object>;
}
