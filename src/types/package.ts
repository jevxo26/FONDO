export interface PackageCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PackageRule {
  title?: string;
  description?: string;
}

export interface PackageReview {
  id?: string;
  rating?: number;
}

export interface PackageFood {
  id?: string;
  foodId?: string;
  name?: string;
  thumbnail?: string;
  quantity?: number;
  price?: number | string;
  isExtra?: boolean;
  calories?: number | null;
  protein?: number | null;
  carbohydrate?: number | null;
  fat?: number | null;
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  cholesterol?: number | null;
  variants?: Array<{ price?: number | string }>;
  food?: PackageFood | null;
}

export interface PackageMeal {
  id?: string;
  mealType?: string;
  mealTime?: string;
  foods?: PackageFood[];
}

export interface PackageDay {
  id?: string;
  dayNumber: number;
  title?: string;
  description?: string;
  meals?: PackageMeal[];
}

export interface Package {
  id: string;
  packageCode?: string;
  name: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  coverImage?: string;
  packageType?: string;
  durationDays: number;
  totalMeals: number;
  price: string | number;
  discountPrice?: string | number | null;
  currency?: string;
  isCustomizable?: boolean;
  rating?: number | null;
  calories?: number | null;
  packageCategoryId?: string;
  packageCategory?: PackageCategory | null;
  reviews?: PackageReview[] | null;
  rule?: PackageRule | null;
  days?: PackageDay[];
}

export interface CustomFood {
  foodId: string;
  name: string;
  thumbnail?: string;
  quantity: number;
  price: number;
  isExtra: boolean;
}

export interface CustomMeal {
  mealType: string;
  mealTime?: string;
  foods: CustomFood[];
}

export interface CustomDay {
  dayNumber: number;
  meals: CustomMeal[];
}
