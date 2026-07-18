export interface FoodSubCategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  sortOrder: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  image: string | null;
  sortOrder: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  subCategories: FoodSubCategory[];
  _count: {
    foods: number;
  };
}

export interface FoodCategoriesData {
  items: FoodCategory[];
}

export interface FoodCategoriesResponse {
  success: boolean;
  message: string;
  data: FoodCategoriesData;
}