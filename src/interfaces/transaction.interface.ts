export interface Transaction {
  value: number;
  account: object; //ObjectId
  category: object; //ObjectId
  comment: string | undefined;
  transaction_date: string;
  type: 'addition' | 'substraction';
  user: object; //ObjectId
}
