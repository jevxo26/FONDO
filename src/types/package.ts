export type FoodType = "VEG" | "NON_VEG";
export type SpiceLevel = "MILD" | "MEDIUM" | "HOT";

export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  foodCode?: string;
  shortDescription?: string;
  description?: string;
  thumbnail?: string;
  coverImage?: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrate?: number;
  averageRating?: number;
  totalReview?: number;
  foodType?: FoodType;
  spiceLevel?: SpiceLevel;
}

export interface PackageFood {
  id: string;
  foodId: string;
  quantity: number;
  isOptional?: boolean;
  food: FoodItem;
}

export interface PackageMeal {
  id: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  mealTime?: string;
  foods: PackageFood[];
}

export interface PackageDay {
  id: string;
  dayNumber: number;
  title: string;
  meals: PackageMeal[];
}

export interface PackageCategory {
  id: string;
  name: string;
  slug?: string;
}

export interface Package {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  durationDays: number;
  totalMeals: number;
  packageType: string;
  isCustomizable: boolean;
  packageCategoryId: string;
  packageCategory?: PackageCategory;
  rating?: string;

  averageRating?: number;
  days?: PackageDay[];
}