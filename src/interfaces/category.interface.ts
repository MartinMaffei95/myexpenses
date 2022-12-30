export interface Category {
  _id: string | object;
  name: string;
  icon: string | null;
  public: boolean;
  from?: string;
  sub_category: Category[] | null | string[] | object[];
  isSubCategory: boolean;
}
