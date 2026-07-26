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
  foodCode?: string;
  shortDescription?: string;
  description?: string;
  thumbnail?: string;
  coverImage?: string;

  foodType: "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
  spiceLevel: "MILD" | "MEDIUM" | "HOT";

  preparationTime?: number;

  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrate?: number;

  servingSize?: string;

  status?: string;
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;

  category: Category;
  subCategory?: { id: string; name: string; slug: string };

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
  id?: string;
  name: string;
  slug?: string;
}

export interface Diet {
  dietType: string;
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  status?: string;
}

export interface Addon {
  id: string;
  name: string;
  isRequired?: boolean;
  maxSelection?: number;
  status?: string;
  items: AddonItem[];
}

export interface Discount {
  id: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  startDate?: string;
  endDate?: string;
  status?: string;
}
