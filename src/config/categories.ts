import mongoose from 'mongoose';
import { Category } from '../interfaces/category.interface';

export const categories: Category[] = [
  {
    _id: new mongoose.Types.ObjectId(1),
    name: 'Transport',
    icon: null,
    public: true,
    sub_category: [
      {
        _id: new mongoose.Types.ObjectId(11),
        name: 'Taxi',
        icon: null,
        public: true,
        sub_category: null,
      },
      {
        _id: new mongoose.Types.ObjectId(12),
        name: 'Bus',
        icon: null,
        public: true,
        sub_category: null,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(2),
    name: 'Food',
    icon: null,
    public: true,
    sub_category: [
      {
        _id: new mongoose.Types.ObjectId(21),
        name: 'Bar',
        icon: null,
        public: true,
        sub_category: null,
      },
      {
        _id: new mongoose.Types.ObjectId(22),
        name: 'Supermarket',
        icon: null,
        public: true,
        sub_category: null,
      },
      {
        _id: new mongoose.Types.ObjectId(23),
        name: 'Restourant',
        icon: null,
        public: true,
        sub_category: null,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(3),
    name: 'Other income',
    icon: null,
    public: true,
    sub_category: null,
  },
  {
    _id: new mongoose.Types.ObjectId(4),
    name: 'Taxes',
    icon: null,
    public: true,
    sub_category: null,
  },
];
