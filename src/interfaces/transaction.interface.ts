export interface Transaction {
  value: number;
  account: object; //ObjectId
  created_by: object; //ObjectId
  category: object | string; //ObjectId
  comment: string | undefined;
  transaction_date: string;
  type: 'ADDITION' | 'SUBSTRACTION';
}
