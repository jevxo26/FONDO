export interface FoodResponse {
  items: Food[];
  meta: PaginationMeta;
  totalPages: number;

}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface Food {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  coverImage: string;

  foodType: "VEG" | "NON_VEG";
  spiceLevel: "MILD" | "MEDIUM" | "HOT";

  preparationTime: number;

  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;

  servingSize: string;

  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;

  category: Category;

  variants: Variant[];

  addons: Addon[];

  rating: Rating;

  labels: FoodLabel[];

  tags: FoodTag[];

  diets: Diet[];

  discount: Discount | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Variant {
  id: string;
  name: string;
  price: string;
  discountPrice: string | null;
  servingSize: string;
}

export interface Rating {
  averageRating: number;
  totalReview: number;
}

export interface FoodLabel {
  id: string;
  foodId: string;
  label: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoodTag {
  name: string;
}

export interface Diet {
  dietType: string;
}

export interface Addon {
  id: string;
  name: string;
  price: string;
}

export interface Discount {
  type: string;
  value: number;
}