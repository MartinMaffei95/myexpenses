export interface Category {
  id: number | object;
  name: string;
  icon: string | null;
  sub_category: Category[] | null;
}
