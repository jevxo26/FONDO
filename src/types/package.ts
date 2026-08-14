import type { Food } from "./food";

// ==========================================
// ENUMS & CONSTANTS
// ==========================================

export type PackageType = "WEEKLY" | "MONTHLY" | "CUSTOM_PACKAGE" | "STANDARD";

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

// ==========================================
// NUTRITIONAL & FOOD INTERFACES
// ==========================================

export interface FoodVariant {
  id: string;
  name: string;
  price: number | string;
  weightGram?: number;
}

export interface PackageFood {
  id?: string;
  foodId: string;
  quantity: number;
  isExtra?: boolean;
  food?: Food;
}

// ==========================================
// MEALS & DAYS INTERFACES
// ==========================================

export interface PackageMeal {
  id?: string;
  mealType: MealType;
  mealTime?: string;
  foods: PackageFood[];
}

export interface PackageDay {
  id?: string;
  dayNumber: number;
  meals: PackageMeal[];
}

// ==========================================
// CATEGORY & RULE INTERFACES
// ==========================================

export interface PackageCategory {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

export interface PackageRule {
  id: string;
  title: string;
  description?: string;
}

export interface PackageRating {
  id: string;
  packageId: string;
  averageRating: number;
  totalReview: number;
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
  updatedAt: string;
}

export interface PackageReview {
  id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// ==========================================
// CORE PACKAGE INTERFACE
// ==========================================

export interface Package {
  id: string;
  name: string;
  slug?: string;
  packageCode?: string;
  description?: string;
  thumbnail?: string;
  coverImage?: string;

  // Pricing & Metrics
  price: number | string;
  discountPrice?: number | string;
  totalMeals: number;
  durationDays: number;

  // Config
  packageType: PackageType;
  isCustomizable: boolean;
  isActive: boolean;

  // Nested Relations
  packageCategory?: PackageCategory;
  packageCategoryId?: string;
  rule?: PackageRule;
  packageRuleId?: string;

  // Nested Menu Items
  days: PackageDay[];

  // Rating & Feedback
  rating?: PackageRating;
  reviews?: PackageReview[];

  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// CUSTOM MEAL CONCIERGE / STATE INTERFACES
// ==========================================
// types/package.ts

export interface CustomFood {
  foodId: string;
  name?: string;
  thumbnail?: string;
  price?: number;
  quantity: number;
  isExtra?: boolean;
}

export interface CustomMeal {
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | string;
  mealTime?: string;
  foods: CustomFood[];
}

export interface CustomDay {
  dayNumber: number;
  meals: CustomMeal[];
}

/**
 * Payload sent to the backend endpoint:
 * POST /api/custom-meal-requests (or Prisma createCustomMealRequest)
 */
export interface CreateCustomMealRequestPayload {
  packageId: string;
  name: string;
  totalDays: number;
  totalPrice: number;
  days: CustomDay[];
}

export interface CustomMealRequestResponse {
  id: string;
  packageId: string;
  userId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  totalPrice: number;
  createdAt: string;
}