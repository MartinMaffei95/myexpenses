export interface Transaction {
  _id: string;
  value: number;
  account: object; //ObjectId
  created_by: object; //ObjectId
  category: object | string; //ObjectId
  comment: string | undefined;
  transaction_date: string;
  type: 'ADDITION' | 'SUBSTRACTION' | 'TRANSFERENCE';
  from?: object;
  to?: object;
}
