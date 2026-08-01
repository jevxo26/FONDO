import * as yup from "yup";

export type AdminFoodType = "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
export type AdminMealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";

export interface VariantForm {
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  weight: string;
  servingSize: string;
}

export interface AddonItemForm {
  name: string;
  price: number;
  image: string;
}

export interface AddonForm {
  name: string;
  isRequired: boolean;
  maxSelection: number | null;
  items: AddonItemForm[];
}

export interface PriceForm {
  basePrice: number;
  salePrice: number | null;
}

export interface DiscountForm {
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
}

export interface ScheduleForm {
  mealType: AdminMealType;
  startTime: string;
  endTime: string;
}

export interface IngredientForm {
  ingredientName: string;
  quantity: string;
  unit: string;
  isOptional: boolean;
}

export interface AllergenForm {
  allergen: string;
  description: string;
}

export interface LabelForm {
  label: string;
  color: string;
}

export interface DietForm {
  dietType: string;
}

export interface AdminFoodFormValues {
  name: string;
  slug: string;
  categoryId: string;
  subCategoryId: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  preparationTime: number | null;
  foodType: AdminFoodType;
  spiceLevel: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrate: number | null;
  servingSize: string;
  status: string;
  isFeatured: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  isVisible: boolean;
  isAvailable: boolean;
  availabilityDays: string[];
  tagIds: string[];
  galleryImages: string[];
  variants: VariantForm[];
  addons: AddonForm[];
  prices: PriceForm[];
  discounts: DiscountForm[];
  schedules: ScheduleForm[];
  ingredients: IngredientForm[];
  allergens: AllergenForm[];
  labels: LabelForm[];
  diets: DietForm[];
}

const variantSchema = yup.object().shape({
  name: yup.string().required("Variant name is required"),
  description: yup.string(),
  price: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Must be positive")
    .required("Price is required"),
  discountPrice: yup.number().typeError("Must be a number").nullable(),
  weight: yup.string(),
  servingSize: yup.string(),
});

const addonItemSchema = yup.object().shape({
  name: yup.string().required("Item name is required"),
  price: yup.number().typeError("Must be a number").min(0).required("Price is required"),
  image: yup.string(),
});

const addonSchema = yup.object().shape({
  name: yup.string().required("Addon group name is required"),
  isRequired: yup.boolean(),
  maxSelection: yup.number().typeError("Must be a number").nullable(),
  items: yup.array().of(addonItemSchema),
});

const priceSchema = yup.object().shape({
  basePrice: yup.number().typeError("Must be a number").min(0).required("Base price is required"),
  salePrice: yup.number().typeError("Must be a number").nullable(),
});

const discountSchema = yup.object().shape({
  discountType: yup.string().oneOf(["PERCENTAGE", "FLAT"] as const).required(),
  discountValue: yup
    .number()
    .typeError("Must be a number")
    .min(0)
    .required("Discount value is required"),
});

const scheduleSchema = yup.object().shape({
  mealType: yup
    .string()
    .oneOf(["BREAKFAST", "LUNCH", "DINNER", "SNACKS"] as const)
    .required("Meal type is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
});

const ingredientSchema = yup.object().shape({
  ingredientName: yup.string().required("Ingredient is required"),
  quantity: yup.string(),
  unit: yup.string(),
  isOptional: yup.boolean(),
});

const allergenSchema = yup.object().shape({
  allergen: yup.string().required("Allergen is required"),
  description: yup.string(),
});

const labelSchema = yup.object().shape({
  label: yup.string().required("Label is required"),
  color: yup.string(),
});

const dietSchema = yup.object().shape({
  dietType: yup.string().required("Diet type is required"),
});

export const adminFoodSchema = yup.object().shape({
  name: yup.string().required("Food name is required"),
  slug: yup.string().required("Slug is required"),
  categoryId: yup.string().required("Category is required"),
  subCategoryId: yup.string(),
  shortDescription: yup.string(),
  description: yup.string(),
  thumbnail: yup.string(),
  coverImage: yup.string(),
  preparationTime: yup.number().typeError("Must be a number").nullable(),
  foodType: yup
    .string()
    .oneOf(["VEG", "NON_VEG", "VEGAN", "SEAFOOD"] as const)
    .required("Food type is required"),
  spiceLevel: yup.string(),
  calories: yup.number().typeError("Must be a number").nullable(),
  protein: yup.number().typeError("Must be a number").nullable(),
  fat: yup.number().typeError("Must be a number").nullable(),
  carbohydrate: yup.number().typeError("Must be a number").nullable(),
  servingSize: yup.string(),
  status: yup.string().required("Status is required"),
  isFeatured: yup.boolean(),
  isPopular: yup.boolean(),
  isRecommended: yup.boolean(),
  isVisible: yup.boolean(),
  isAvailable: yup.boolean(),
  availabilityDays: yup.array().of(yup.string()),
  tagIds: yup.array().of(yup.string()),
  galleryImages: yup.array().of(yup.string()),
  variants: yup.array().of(variantSchema),
  addons: yup.array().of(addonSchema),
  prices: yup.array().of(priceSchema),
  discounts: yup.array().of(discountSchema),
  schedules: yup.array().of(scheduleSchema),
  ingredients: yup.array().of(ingredientSchema),
  allergens: yup.array().of(allergenSchema),
  labels: yup.array().of(labelSchema),
  diets: yup.array().of(dietSchema),
});

export const adminFoodInitialValues: AdminFoodFormValues = {
  name: "",
  slug: "",
  categoryId: "",
  subCategoryId: "",
  shortDescription: "",
  description: "",
  thumbnail: "",
  coverImage: "",
  preparationTime: null,
  foodType: "VEG",
  spiceLevel: "MEDIUM",
  calories: null,
  protein: null,
  fat: null,
  carbohydrate: null,
  servingSize: "",
  status: "DRAFT",
  isFeatured: false,
  isPopular: false,
  isRecommended: false,
  isVisible: true,
  isAvailable: true,
  availabilityDays: [],
  tagIds: [],
  galleryImages: [],
  variants: [],
  addons: [],
  prices: [],
  discounts: [],
  schedules: [],
  ingredients: [],
  allergens: [],
  labels: [],
  diets: [],
};

export const availabilityDayOptions = [
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
  { value: "Sun", label: "Sun" },
];
