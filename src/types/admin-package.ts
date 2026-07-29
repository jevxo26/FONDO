export interface PackageBenefit {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

export interface PackageNutrition {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbohydrate: number;
  dailyFat: number;
  dailyFiber: number;
  dailySugar: number;
  dailySodium: number;
}

export interface PackageRules {
  minimumOrderDays: number;
  maximumOrderDays: number;
  minimumMealsPerDay: number;
  maximumMealsPerDay: number;
  advancePaymentRequired: boolean;
  allowPause: boolean;
  allowResume: boolean;
  allowSkipMeal: boolean;
  allowCancellation: boolean;
  deliveryDays: string[];
  deliveryTimeStart: string;
  deliveryTimeEnd: string;
  mealCutoffTime: string;
}

export interface AdminPackage {
  id?: string;
  packageCode: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  status: "ACTIVE" | "DRAFT";
  price: number;
  discountPrice?: number;
  currency: string;
  vat: number;
  deliveryCharge: number;
  packageType: string;
  durationDays: number;
  totalMeals: number;
  isCustomizable: boolean;
  thumbnail?: string;
  coverImage?: string;
  gallery?: string[];
  benefits: PackageBenefit[];
  nutrition: PackageNutrition;
  rules: PackageRules;
  vendorId?: string;
  vendorName?: string;
  totalOrders?: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}
