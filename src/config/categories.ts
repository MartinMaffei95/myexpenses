import { Category } from '../interfaces/category.interface';

const categories: Category[] = [
  {
    id: 1,
    name: 'Transport',
    icon: null,
    father_category: null,
    sub_category: [11],
  },
  {
    id: 11,
    name: 'Taxi',
    icon: null,
    father_category: 1,
    sub_category: null,
  },
  {
    id: 12,
    name: 'Bus',
    icon: null,
    father_category: 1,
    sub_category: null,
  },
  {
    id: 2,
    name: 'Food',
    icon: null,
    father_category: null,
    sub_category: [11],
  },
  {
    id: 21,
    name: 'Bar',
    icon: null,
    father_category: 2,
    sub_category: null,
  },
  {
    id: 22,
    name: 'Supermarket',
    icon: null,
    father_category: 2,
    sub_category: null,
  },
  {
    id: 23,
    name: 'Restourant',
    icon: null,
    father_category: 2,
    sub_category: null,
  },
  {
    id: 3,
    name: 'Other income',
    icon: null,
    father_category: null,
    sub_category: null,
  },
  {
    id: 4,
    name: 'Taxes',
    icon: null,
    father_category: null,
    sub_category: null,
  },
];
