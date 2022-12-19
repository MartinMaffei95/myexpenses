export interface Transaction {
  value: number;
  account: object; //ObjectId
  created_by: object; //ObjectId
  category: object | number; //ObjectId
  comment: string | undefined;
  transaction_date: string;
  type: 'addition' | 'substraction';
}
