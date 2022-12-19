import { Category } from '../interfaces/category.interface';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Transport',
    icon: null,
    sub_category: [
      {
        id: 11,
        name: 'Taxi',
        icon: null,
        sub_category: null,
      },
      {
        id: 12,
        name: 'Bus',
        icon: null,
        sub_category: null,
      },
    ],
  },
  {
    id: 2,
    name: 'Food',
    icon: null,
    sub_category: [
      {
        id: 21,
        name: 'Bar',
        icon: null,
        sub_category: null,
      },
      {
        id: 22,
        name: 'Supermarket',
        icon: null,
        sub_category: null,
      },
      {
        id: 23,
        name: 'Restourant',
        icon: null,
        sub_category: null,
      },
    ],
  },
  {
    id: 3,
    name: 'Other income',
    icon: null,
    sub_category: null,
  },
  {
    id: 4,
    name: 'Taxes',
    icon: null,
    sub_category: null,
  },
];
