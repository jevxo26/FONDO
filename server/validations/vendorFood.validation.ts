import * as yup from "yup";

export const createVendorFoodSchema = yup.object({
  vendorId: yup.string().optional(),
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  categoryId: yup.string().required("Category is required"),
  subCategoryId: yup.string().optional(),
  shortDescription: yup.string().optional(),
  fullDescription: yup.string().optional(),
  foodType: yup
    .mixed()
    .oneOf(["VEG", "NON_VEG", "VEGAN", "SEAFOOD", "EGG"])
    .required("Food type is required"),
  spiceLevel: yup.string().optional(),
  preparationTime: yup.number().integer().optional(),
  status: yup.string().optional(),
  thumbnail: yup.string().optional(),
  coverImage: yup.string().optional(),
  galleryImages: yup.array().of(yup.object({ url: yup.string().optional() })).optional(),
  basePrice: yup.number().positive().required("Base price is required"),
  discountPrice: yup.number().positive().optional().nullable(),
  variants: yup.array().of(
    yup.object({
      variantName: yup.string().required(),
      sku: yup.string().optional(),
      servingSize: yup.string().optional(),
      price: yup.number().positive().required(),
      discountPrice: yup.number().positive().optional().nullable(),
      stock: yup.number().integer().optional(),
      isDefault: yup.boolean().optional(),
    }),
  ).optional(),
  nutrition: yup.object({
    calories: yup.number().optional(),
    protein: yup.number().optional(),
    fat: yup.number().optional(),
    carbohydrate: yup.number().optional(),
    fiber: yup.number().optional(),
    sugar: yup.number().optional(),
    sodium: yup.number().optional(),
    servingSize: yup.string().optional(),
  }).optional(),
  ingredients: yup.array().of(yup.object({ name: yup.string().required() })).optional(),
  allergens: yup.array().of(yup.object({ name: yup.string().required() })).optional(),
  labels: yup.array().of(yup.string()).optional(),
  tags: yup.array().of(yup.string()).optional(),
  available: yup.boolean().optional(),
  visible: yup.boolean().optional(),
  featured: yup.boolean().optional(),
  popular: yup.boolean().optional(),
  recommended: yup.boolean().optional(),
  availableDays: yup.array().of(yup.string()).optional(),
  timeSlots: yup.object({
    start: yup.string().optional(),
    end: yup.string().optional(),
  }).optional(),
});

export const updateVendorFoodStatusSchema = yup.object({
  status: yup
    .mixed()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export const rejectFoodSchema = yup.object({
  reason: yup.string().required("Rejection reason is required"),
});
