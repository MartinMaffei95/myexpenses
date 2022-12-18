export interface Category {
  id: number | object;
  name: string;
  icon: string | null;
  father_category: object | number | null;
  sub_category: [object | number] | null;
}
