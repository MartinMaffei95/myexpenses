interface MongooseQuery {
  _id?: object | string;
  value?: number | object;
  value_majorOf?: number;
  value_minorOf?: number;
  account?: object;
  created_by?: object;
  category?: object | number;
  comment?: string;
  date?: string;
  date_afterOf?: string;
  date_beforeOf?: string;
  type?: 'ADDITION' | 'SUBSTRACTION';
}

// POSIBLE QUERIES
//   _id?: object | string; OK
//   value?: number | object; OK
//   value_majorOf?: number; OK
//   value_minorOf?: number; OK
//   value_major_orEqualOf?: number; OK
//   value_minor_orEqualOf?: number; OK
//   account?: object; OK
//   created_by?: object; OK
//   category?: object | number;
//   comment?: string;
//   date?: string;
//   date_afterOf?: string;
//   date_beforeOf?: string;
//   type?: 'ADDITION' | 'SUBSTRACTION'; OK

const createQuery = (query: object) => {
  let mongooseQuery: MongooseQuery = {};

  for (const [key, value] of Object.entries(query)) {
    switch (key) {
      //This particular case avoid query transactions for other user
      case 'created_by':
        break;
      case 'id':
        mongooseQuery = { ...mongooseQuery, _id: value };
        break;
      case 'value_majorOf':
        mongooseQuery = { ...mongooseQuery, value: { $gt: value } };
        break;
      case 'value_minorOf':
        mongooseQuery = { ...mongooseQuery, value: { $lt: value } };
        break;
      case 'value_major_orEqualOf':
        mongooseQuery = { ...mongooseQuery, value: { $gte: value } };
        break;
      case 'value_minor_orEqualOf':
        mongooseQuery = { ...mongooseQuery, value: { $lte: value } };
        break;
      default:
        mongooseQuery = { ...mongooseQuery, [key]: value };
        break;
    }
  }

  return mongooseQuery;
};
export { createQuery };
