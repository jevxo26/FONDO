export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  sortOrder: number;
  status: string;

  subCategories: SubCategory[];

  _count: {
    foods: number;
  };
}

export interface CategoryResponse {
  items: Category[];
}