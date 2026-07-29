import * as yup from "yup";

export const foodSchema = yup.object().shape({
  name: yup.string().required("Food name is required"),
  quantity: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Must be a number")
    .positive("Min 1")
    .required("Required"),
});

export const mealSchema = yup.object().shape({
  mealType: yup.string().required("Meal type is required"),
  mealTime: yup.string().required("Time is required"),
  foods: yup.array().of(foodSchema).min(1, "At least 1 food item required"),
});

export const daySchema = yup.object().shape({
  dayNumber: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required(),
  title: yup.string().required("Day title is required"),
  meals: yup.array().of(mealSchema).min(1, "At least 1 meal required"),
});

export const packageSchema = yup.object().shape({
  packageCode: yup.string().required("Package code is required"),
  name: yup.string().min(3, "Name must be at least 3 chars").required("Package name is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().required("Description is required"),
  thumbnail: yup.string().url("Must be a valid URL").required("Thumbnail URL required"),
  coverImage: yup.string().url("Must be a valid URL").required("Cover image URL required"),
  packageType: yup.string().required("Package type is required"),
  customTypeName: yup.string().when("packageType", {
    is: "CUSTOM",
    then: (schema) => schema.required("Custom type name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  durationDays: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Must be a number")
    .positive("Must be greater than 0")
    .required("Duration is required"),
  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Price must be a number")
    .positive("Price required")
    .required(),
  discountPrice: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Must be a number")
    .min(0, "Cannot be negative")
    .test("less-than-price", "Discount cannot exceed price", function (val) {
      const { price } = this.parent;
      return val === undefined || price === undefined || val <= price;
    })
    .required(),
  currency: yup.string().default("BDT"),
  isCustomizable: yup.boolean().default(true),
  status: yup.string().oneOf(["active", "inactive"]).required("Status is required"),
  packageCategoryId: yup.string().required("Category is required"),
  days: yup.array().of(daySchema).min(1, "At least 1 day schedule is required"),
});

export type PackageFormValues = yup.InferType<typeof packageSchema>;

export interface PackageBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PackageNutrition {
  dailyCalories: number | string;
  dailyProtein: number | string;
  dailyCarbohydrate: number | string;
  dailyFat: number | string;
  dailyFiber: number | string;
  dailySugar: number | string;
  dailySodium: number | string;
}

export interface PackageRules {
  minimumOrderDays: number | string;
  maximumOrderDays: number | string;
  minimumMealsPerDay: number | string;
  maximumMealsPerDay: number | string;
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

export interface PackageFormData {
  name: string;
  slug: string;
  packageCode: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  price: number;
  discountPrice: number | string;
  currency: string;
  vat: number;
  deliveryCharge: number;
  packageType: string;
  durationDays: number | string;
  totalMeals: number | string;
  isCustomizable: boolean;
  thumbnail: string;
  coverImage: string;
  gallery: string[];
  benefits: PackageBenefit[];
  nutrition: PackageNutrition;
  rules: PackageRules;
}

export const CATEGORIES = [
  { id: "7a7bcb9c-4933-4e6d-b1ab-795d1c9bc85b", name: "Weight Gain & Muscle Building" },
  { id: "8b8cd12a-3211-4e6a-c2bc-886e2d9bc99c", name: "Weight Loss & Keto" },
  { id: "9c9de23b-4322-5f7b-d3cd-997f3e0bc11d", name: "Balanced Daily Diet" },
];

export const PRESET_FOODS = [
  "Chicken Biryani",
  "Rosogolla (2 pcs)",
  "Fish Curry (Rui/Katol)",
  "Grilled Chicken Salad",
  "Daal (Lentil Soup)",
  "Mango Lassi",
  "Beef Curry",
  "Plain Paratha",
  "Vegetable Khichuri",
  "Mutton Rezala",
  "Oatmeal with Honey & Fruits",
  "Boiled Egg (2 pcs)",
];

export const initialDummyData: PackageFormValues = {
  packageCode: "PKG-WG-PRO",
  name: "7-Day Premium Weight Gain & Muscle Plan",
  slug: "7-day-premium-weight-gain-muscle-plan",
  description: "A fully structured 7-day high-calorie and high-protein meal package designed for healthy weight gain.",
  thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80",
  packageType: "WEEKLY",
  customTypeName: "",
  durationDays: 7,
  price: 4200,
  discountPrice: 3900,
  currency: "BDT",
  isCustomizable: true,
  status: "active",
  packageCategoryId: "7a7bcb9c-4933-4e6d-b1ab-795d1c9bc85b",
  days: [
    {
      dayNumber: 1,
      title: "Day 1 - High Protein Start",
      meals: [
        {
          mealType: "BREAKFAST",
          mealTime: "08:00 AM",
          foods: [
            { name: "Oatmeal with Honey & Fruits", quantity: 1 },
            { name: "Boiled Egg (2 pcs)", quantity: 1 },
          ],
        },
        {
          mealType: "LUNCH",
          mealTime: "01:30 PM",
          foods: [{ name: "Chicken Biryani", quantity: 1 }],
        },
      ],
    },
  ],
};

export const inputStyles ="w-full px-3.5 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground shadow-sm";