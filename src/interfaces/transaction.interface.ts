export interface Transaction {
  value: number;
  name: string;
  family: string;
  sub_family: string | undefined;
  comment: string | undefined;
  transaction_date: string;
  type: 'addition' | 'substraction';
}
