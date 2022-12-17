export interface Transaction {
  value: number;
  account: string;
  category: object;
  comment: string | undefined;
  transaction_date: string;
  type: 'addition' | 'substraction';
}
