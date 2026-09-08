import * as yup from "yup";


export const foodSchema = yup.object({
  foodId: yup.string().required("Food is required"),

  quantity: yup
    .number()
    .transform((_, value) => value === "" ? undefined : Number(value))
    .typeError("Quantity must be a number")
    .min(1, "Minimum quantity is 1")
    .required("Quantity is required"),
});

export const mealSchema = yup.object({
  mealType: yup.string().required(),
  mealTime: yup.string().required(),
  foods: yup
    .array()
    .of(foodSchema)
    .min(1, "Select at least one food")
    .required(),
});


export const daySchema = yup.object({
  dayNumber: yup.number().required(),

  title: yup.string().required(),

  description: yup.string().default(""),

  meals: yup
    .array()
    .of(mealSchema)
    .min(1)
    .required(),
});

export const imageFieldSchema = yup
  .string()
  .trim()
  .required("Image is required")
  .test("valid-image-path", "Please upload a valid image", (value) => {
    if (!value) return false;

    const trimmed = value.trim();
    return (
      /^https?:\/\//i.test(trimmed) ||
      /^\//.test(trimmed) ||
      /^data:image\//i.test(trimmed)
    );
  });

export const packageSchema = yup.object({
  packageCode: yup.string().required(),

  name: yup.string().required(),

  slug: yup.string().required(),

  description: yup.string().required(),

  thumbnail: imageFieldSchema,
  coverImage: imageFieldSchema,
  packageType: yup
    .string()
    .oneOf(["WEEKLY", "MONTHLY", "CUSTOM", "CUSTOM_PACKAGE"])
    .required(),

  customTypeName: yup.string().when("packageType", {
    is: "CUSTOM",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  durationDays: yup
    .number()
    .min(1)
    .required(),

  price: yup
    .number()
    .min(0)
    .required(),

  discountPrice: yup
    .number()
    .min(0)
    .max(yup.ref("price"))
    .required(),

  discountPercent: yup
    .number()
    .min(0)
    .max(100)
    .default(0),

  currency: yup.string().default("BDT"),

  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required(),

  vendorId: yup.string(),

  isCustomizable: yup.boolean().default(true),

  packageCategoryId: yup.string().required(),

  days: yup
    .array()
    .of(daySchema)
    .min(1)
    .required(),
});

export type PackageFormValues =
  yup.InferType<typeof packageSchema>;

export type PackageFormData = PackageFormValues;

export type { PackageBenefit, PackageNutrition, PackageRules } from "@/types/admin-package";

export const initialValues: PackageFormValues = {
  packageCode: "",

  name: "",

  slug: "",

  description: "",

  thumbnail: "",

  coverImage: "",

  packageType: "WEEKLY",

  customTypeName: "",

  durationDays: 7,

  price: 0,

  discountPrice: 0,

  discountPercent: 0,

  currency: "BDT",

  status: "active",

  vendorId: "",

  isCustomizable: true,

  packageCategoryId: "",

  days: [],
};

export const inputStyles = "w-full px-3.5 py-2 text-sm bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground shadow-sm";