// Admin food catalog — matches server/services/adminFoodQueryService responses
// and adminFood.validation.ts payloads.

export interface AdminFoodListResponse {
  items: AdminFoodListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminFoodListItem {
  id: string;
  foodCode: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  coverImage: string | null;
  category: { id: string; name: string; slug: string } | null;
  subCategory: { id: string; name: string; slug: string } | null;
  vendors: { id: string; businessName: string }[];
  foodType: "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
  spiceLevel: string | null;
  basePrice: number | null;
  preparationTime: number | null;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED" | "INACTIVE";
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  averageRating: number | null;
  totalReview: number | null;
  labels: AdminFoodLabel[];
  tags: AdminFoodTag[];
  discount: AdminFoodDiscount | null;
  createdAt: string;
}

export interface AdminFoodLabel {
  id: string;
  foodId: string;
  label: string;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFoodTag {
  id: string;
  name: string;
  slug: string;
}

export interface AdminFoodDiscount {
  id: string;
  foodId: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: string;
  startDate: string | null;
  endDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFoodVariant {
  id: string;
  foodId: string;
  name: string;
  description: string | null;
  price: string;
  discountPrice: string | null;
  weight: string | null;
  servingSize: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAddonItem {
  id: string;
  addonId: string;
  name: string;
  price: string;
  image: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFoodAddon {
  id: string;
  foodId: string;
  name: string;
  isRequired: boolean;
  maxSelection: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: AdminAddonItem[];
}

export interface AdminFoodIngredient {
  id: string;
  foodId: string;
  ingredientName: string;
  quantity: string | null;
  unit: string | null;
  isOptional: boolean;
}

export interface AdminFoodAllergen {
  id: string;
  foodId: string;
  allergen: string;
  description: string | null;
}

export interface AdminFoodSchedule {
  id: string;
  foodId: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";
  startTime: string;
  endTime: string;
  status: string;
}

export interface AdminFoodPrice {
  id: string;
  foodId: string;
  basePrice: string;
  salePrice: string | null;
  currency: string;
  effectiveFrom: string | null;
  effectiveTo: string | null;
  status: string;
}

export interface AdminFoodDiet {
  id: string;
  foodId: string;
  dietType: string;
}

export interface AdminFoodImage {
  id: string;
  foodId: string;
  image: string;
  sortOrder: number;
}

export interface AdminFoodAvailability {
  id: string;
  foodId: string;
  availableFrom: string | null;
  availableTo: string | null;
  isAvailable: boolean;
  availableDays: string[] | null;
}

export interface AdminFoodVisibility {
  id: string;
  foodId: string;
  isVisible: boolean;
  isFeatured: boolean;
  isRecommended: boolean;
  displayOrder: number;
}

export interface AdminFoodDetail {
  id: string;
  foodCode: string;
  name: string;
  slug: string;
  categoryId: string;
  subCategoryId: string | null;
  category: { id: string; name: string; slug: string };
  subCategory: { id: string; name: string; slug: string } | null;
  shortDescription: string | null;
  description: string | null;
  thumbnail: string | null;
  coverImage: string | null;
  preparationTime: number | null;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrate: number | null;
  fiber: number | null;
  sugar: number | null;
  sodium: number | null;
  cholesterol: number | null;
  servingSize: string | null;
  foodType: "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
  spiceLevel: string | null;
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  status: string;
  averageRating: number | null;
  totalReview: number | null;
  createdAt: string;
  updatedAt: string;
  gallery: AdminFoodImage[];
  images: AdminFoodImage[];
  variants: AdminFoodVariant[];
  addons: AdminFoodAddon[];
  ingredients: AdminFoodIngredient[];
  allergens: AdminFoodAllergen[];
  schedules: AdminFoodSchedule[];
  prices: AdminFoodPrice[];
  discounts: AdminFoodDiscount[];
  labels: AdminFoodLabel[];
  tags: AdminFoodTag[];
  diets: AdminFoodDiet[];
  availability: AdminFoodAvailability | null;
  visibility: AdminFoodVisibility | null;
  vendors: { id: string; businessName: string }[];
  _count: { reviews: number; favorites: number };
}

export interface AdminFoodCategory {
  id: string;
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
  subCategories: AdminFoodSubCategory[];
  _count: { foods: number };
}

export interface AdminFoodSubCategory {
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

// ─── Payloads ───────────────────────────────────────────────

export type FoodType = "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";

export interface VariantPayload {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number | null;
  weight?: string;
  servingSize?: string;
  status?: string;
}

export interface AddonItemPayload {
  name: string;
  price: number;
  image?: string;
  status?: string;
}

export interface AddonPayload {
  name: string;
  isRequired?: boolean;
  maxSelection?: number | null;
  status?: string;
  items?: AddonItemPayload[];
}

export interface PricePayload {
  basePrice: number;
  salePrice?: number | null;
  currency?: string;
  effectiveFrom?: string | null;
  effectiveTo?: string | null;
  status?: string;
}

export interface DiscountPayload {
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  startDate?: string | null;
  endDate?: string | null;
  status?: string;
}

export interface SchedulePayload {
  mealType: MealType;
  startTime: string;
  endTime: string;
  status?: string;
}

export interface AvailabilityPayload {
  isAvailable?: boolean;
  availableFrom?: string;
  availableTo?: string;
  availableDays?: string[];
}

export interface VisibilityPayload {
  isVisible?: boolean;
  isFeatured?: boolean;
  isRecommended?: boolean;
  displayOrder?: number;
}

export interface IngredientPayload {
  ingredientName: string;
  quantity?: string;
  unit?: string;
  isOptional?: boolean;
}

export interface AllergenPayload {
  allergen: string;
  description?: string;
}

export interface LabelPayload {
  label: string;
  color?: string;
}

export interface DietPayload {
  dietType: string;
}

export interface CreateFoodPayload {
  categoryId: string;
  subCategoryId?: string | null;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  thumbnail?: string;
  coverImage?: string;
  preparationTime?: number | null;
  calories?: number | null;
  protein?: number | null;
  fat?: number | null;
  carbohydrate?: number | null;
  servingSize?: string;
  foodType: FoodType;
  spiceLevel?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  status?: string;
  tagIds?: string[];
  gallery?: string[];
  images?: string[];
  diets?: DietPayload[];
  labels?: LabelPayload[];
  ingredients?: IngredientPayload[];
  allergens?: AllergenPayload[];
  variants?: VariantPayload[];
  addons?: AddonPayload[];
  prices?: PricePayload[];
  discounts?: DiscountPayload[];
  schedules?: SchedulePayload[];
  availability?: AvailabilityPayload;
  visibility?: VisibilityPayload;
}

export interface UpdateFoodPayload {
  categoryId?: string;
  subCategoryId?: string | null;
  name?: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  thumbnail?: string;
  coverImage?: string;
  preparationTime?: number | null;
  calories?: number | null;
  protein?: number | null;
  fat?: number | null;
  carbohydrate?: number | null;
  servingSize?: string;
  foodType?: FoodType;
  spiceLevel?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  status?: string;
  diets?: DietPayload[];
}

export interface CategoryPayload {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  sortOrder?: number;
  status?: string;
}

export interface SubCategoryPayload {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  sortOrder?: number;
  status?: string;
}

export interface NutritionPayload {
  calories?: number | null;
  protein?: number | null;
  fat?: number | null;
  carbohydrate?: number | null;
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  cholesterol?: number | null;
  servingSize?: string;
}
