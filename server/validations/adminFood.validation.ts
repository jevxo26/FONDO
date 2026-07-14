import * as yup from "yup";

export const createFoodSchema = yup.object({
  categoryId: yup.string().required("Category is required"),
  subCategoryId: yup.string().optional(),
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  shortDescription: yup.string().optional(),
  description: yup.string().optional(),
  thumbnail: yup.string().url().optional(),
  coverImage: yup.string().url().optional(),
  preparationTime: yup.number().integer().optional(),
  calories: yup.number().optional(),
  protein: yup.number().optional(),
  fat: yup.number().optional(),
  carbohydrate: yup.number().optional(),
  servingSize: yup.string().optional(),
  foodType: yup.mixed().oneOf(["VEG", "NON_VEG", "VEGAN", "SEAFOOD"]).required("Food type is required"),
  spiceLevel: yup.string().optional(),
  isFeatured: yup.boolean().optional(),
  isPopular: yup.boolean().optional(),
  isRecommended: yup.boolean().optional(),
  status: yup.string().optional(),
});

export const updateFoodSchema = yup.object({
  categoryId: yup.string().optional(),
  subCategoryId: yup.string().optional().nullable(),
  name: yup.string().optional(),
  slug: yup.string().optional(),
  shortDescription: yup.string().optional(),
  description: yup.string().optional(),
  thumbnail: yup.string().url().optional(),
  coverImage: yup.string().url().optional(),
  preparationTime: yup.number().integer().optional().nullable(),
  calories: yup.number().optional().nullable(),
  protein: yup.number().optional().nullable(),
  fat: yup.number().optional().nullable(),
  carbohydrate: yup.number().optional().nullable(),
  servingSize: yup.string().optional(),
  foodType: yup.mixed().oneOf(["VEG", "NON_VEG", "VEGAN", "SEAFOOD"]).optional(),
  spiceLevel: yup.string().optional(),
  isFeatured: yup.boolean().optional(),
  isPopular: yup.boolean().optional(),
  isRecommended: yup.boolean().optional(),
  status: yup.string().optional(),
});

export const createCategorySchema = yup.object({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().optional(),
  icon: yup.string().optional(),
  image: yup.string().url().optional(),
  sortOrder: yup.number().integer().optional(),
  status: yup.string().optional(),
});

export const updateCategorySchema = yup.object({
  name: yup.string().optional(),
  slug: yup.string().optional(),
  description: yup.string().optional(),
  icon: yup.string().optional(),
  image: yup.string().url().optional(),
  sortOrder: yup.number().integer().optional(),
  status: yup.string().optional(),
});

export const createSubCategorySchema = yup.object({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().optional(),
  icon: yup.string().optional(),
  image: yup.string().url().optional(),
  sortOrder: yup.number().integer().optional(),
  status: yup.string().optional(),
});

export const updateSubCategorySchema = yup.object({
  name: yup.string().optional(),
  slug: yup.string().optional(),
  description: yup.string().optional(),
  icon: yup.string().optional(),
  image: yup.string().url().optional(),
  sortOrder: yup.number().integer().optional(),
  status: yup.string().optional(),
});

export const createVariantSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().optional(),
  price: yup.number().positive().required("Price is required"),
  discountPrice: yup.number().positive().optional().nullable(),
  weight: yup.string().optional(),
  servingSize: yup.string().optional(),
  status: yup.string().optional(),
});

export const updateVariantSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  price: yup.number().positive().optional(),
  discountPrice: yup.number().positive().optional().nullable(),
  weight: yup.string().optional(),
  servingSize: yup.string().optional(),
  status: yup.string().optional(),
});

export const createAddonSchema = yup.object({
  name: yup.string().required("Name is required"),
  isRequired: yup.boolean().optional(),
  maxSelection: yup.number().integer().optional().nullable(),
  status: yup.string().optional(),
});

export const updateAddonSchema = yup.object({
  name: yup.string().optional(),
  isRequired: yup.boolean().optional(),
  maxSelection: yup.number().integer().optional().nullable(),
  status: yup.string().optional(),
});

export const createAddonItemSchema = yup.object({
  name: yup.string().required("Name is required"),
  price: yup.number().positive().required("Price is required"),
  image: yup.string().url().optional(),
  status: yup.string().optional(),
});

export const updateAddonItemSchema = yup.object({
  name: yup.string().optional(),
  price: yup.number().positive().optional(),
  image: yup.string().url().optional(),
  status: yup.string().optional(),
});

export const updateNutritionSchema = yup.object({
  calories: yup.number().optional().nullable(),
  protein: yup.number().optional().nullable(),
  fat: yup.number().optional().nullable(),
  carbohydrate: yup.number().optional().nullable(),
  fiber: yup.number().optional().nullable(),
  sugar: yup.number().optional().nullable(),
  sodium: yup.number().optional().nullable(),
  cholesterol: yup.number().optional().nullable(),
  servingSize: yup.string().optional(),
});

export const createIngredientSchema = yup.object({
  ingredientName: yup.string().required("Ingredient name is required"),
  quantity: yup.string().optional(),
  unit: yup.string().optional(),
  isOptional: yup.boolean().optional(),
});

export const createAllergenSchema = yup.object({
  allergen: yup.string().required("Allergen is required"),
  description: yup.string().optional(),
});

export const createPriceSchema = yup.object({
  basePrice: yup.number().positive().required("Base price is required"),
  salePrice: yup.number().positive().optional().nullable(),
  currency: yup.string().optional(),
  effectiveFrom: yup.date().optional().nullable(),
  effectiveTo: yup.date().optional().nullable(),
  status: yup.string().optional(),
});

export const createDiscountSchema = yup.object({
  discountType: yup.mixed().oneOf(["PERCENTAGE", "FLAT"]).required("Discount type is required"),
  discountValue: yup.number().positive().required("Discount value is required"),
  startDate: yup.date().optional().nullable(),
  endDate: yup.date().optional().nullable(),
  status: yup.string().optional(),
});

export const addFoodTagsSchema = yup.object({
  tagIds: yup.array().of(yup.string()).min(1).required("At least one tag ID required"),
});

export const createTagSchema = yup.object({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
});

export const createLabelSchema = yup.object({
  label: yup.string().required("Label is required"),
  color: yup.string().optional(),
});

export const updateAvailabilitySchema = yup.object({
  isAvailable: yup.boolean().optional(),
  availableFrom: yup.string().optional(),
  availableTo: yup.string().optional(),
  availableDays: yup.array().of(yup.string()).optional(),
});

export const createScheduleSchema = yup.object({
  mealType: yup.mixed().oneOf(["BREAKFAST", "LUNCH", "DINNER", "SNACKS"]).required("Meal type is required"),
  startTime: yup.string().required("Start time is required (HH:mm)"),
  endTime: yup.string().required("End time is required (HH:mm)"),
  status: yup.string().optional(),
});

export const updateVisibilitySchema = yup.object({
  isVisible: yup.boolean().optional(),
  isFeatured: yup.boolean().optional(),
  isRecommended: yup.boolean().optional(),
  displayOrder: yup.number().integer().optional(),
});
