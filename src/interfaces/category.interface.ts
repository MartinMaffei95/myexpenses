export interface Category {
  id: string | object;
  name: string;
  icon: string | null;
  sub_category: Category[] | null;
}
