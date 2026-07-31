import * as yup from "yup";

export const inputStyles =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export interface FoodFormValues {
    vendorId: string;
    name: string;
    slug: string;
    categoryId: string;
    subCategoryId?: string;
    shortDescription?: string;
    fullDescription?: string;
    foodType: "VEG" | "NON_VEG" | "VEGAN" | "EGG";
    spiceLevel?: "MILD" | "MEDIUM" | "HOT" | "VERY_HOT";
    preparationTime?: number;
    status: "ACTIVE" | "INACTIVE" | "DRAFT" | "ARCHIVED";
    thumbnail: string;
    coverImage?: string;
    galleryImages: { url: string }[];
    basePrice: number;
    discountPrice?: number;
    variants: {
        variantName: string;
        sku: string;
        servingSize: string;
        price: number;
        discountPrice?: number;
        stock: number;
        isDefault: boolean;
    }[];
    nutrition: {
        calories: number;
        protein?: number;
        fat?: number;
        carbohydrate?: number;
        fiber?: number;
        sugar?: number;
        sodium?: number;
        servingSize: string;
    };
    ingredients: { name: string }[];
    allergens: { name: string }[];
    labels: string[];
    tags: string[];
    available: boolean;
    visible: boolean;
    featured: boolean;
    popular: boolean;
    recommended: boolean;
    availableDays: string[];
    timeSlots: {
        start?: string;
        end?: string;
    };
}

export const foodSchema = yup.object().shape({
    vendorId: yup.string().required("Vendor is required"),
    name: yup.string().required("Food name is required"),
    slug: yup.string().required("Slug is required"),
    categoryId: yup.string().required("Category is required"),
    subCategoryId: yup.string().optional(),
    shortDescription: yup.string().optional(),
    fullDescription: yup.string().optional(),
    foodType: yup
        .string()
        .oneOf(["VEG", "NON_VEG", "VEGAN", "EGG"] as const)
        .required("Food type is required"),
    spiceLevel: yup
        .string()
        .oneOf(["MILD", "MEDIUM", "HOT", "VERY_HOT"] as const)
        .optional(),
    preparationTime: yup.number().min(0, "Must be positive").optional(),
    status: yup
        .string()
        .oneOf(["ACTIVE", "INACTIVE", "DRAFT", "ARCHIVED"] as const)
        .required("Status is required"),
    thumbnail: yup.string().url("Must be a valid URL").required("Thumbnail is required"),
    coverImage: yup.string().url("Must be a valid URL").optional(),
    galleryImages: yup.array().of(
        yup.object().shape({
            url: yup.string().url("Must be a valid URL").required("Gallery image URL is required"),
        })
    ).default([]),
    basePrice: yup.number().min(0, "Price must be positive").required("Base price is required"),
    discountPrice: yup.number().min(0, "Discount price must be positive").optional(),
    variants: yup.array().of(
        yup.object().shape({
            variantName: yup.string().required("Variant name is required"),
            sku: yup.string().required("SKU is required"),
            servingSize: yup.string().default(""),
            price: yup.number().min(0, "Price must be positive").required("Price is required"),
            discountPrice: yup.number().min(0, "Discount price must be positive").optional(),
            stock: yup.number().min(0, "Stock must be positive").required("Stock is required"),
            isDefault: yup.boolean().default(false),
        })
    ).min(1, "At least one variant is required"),
    nutrition: yup.object().shape({
        calories: yup.number().min(0, "Calories must be positive").required("Calories are required"),
        protein: yup.number().min(0, "Protein must be positive").optional(),
        fat: yup.number().min(0, "Fat must be positive").optional(),
        carbohydrate: yup.number().min(0, "Carbohydrate must be positive").optional(),
        fiber: yup.number().min(0, "Fiber must be positive").optional(),
        sugar: yup.number().min(0, "Sugar must be positive").optional(),
        sodium: yup.number().min(0, "Sodium must be positive").optional(),
        servingSize: yup.string().default(""),
    }),
    ingredients: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Ingredient name is required"),
        })
    ).default([]),
    allergens: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Allergen name is required"),
        })
    ).default([]),
    labels: yup.array().of(yup.string()).default([]),
    tags: yup.array().of(yup.string()).default([]),
    available: yup.boolean().default(true),
    visible: yup.boolean().default(true),
    featured: yup.boolean().default(false),
    popular: yup.boolean().default(false),
    recommended: yup.boolean().default(false),
    availableDays: yup.array().of(yup.string()).default([]),
    timeSlots: yup.object().shape({
        start: yup.string().optional(),
        end: yup.string().optional(),
    }).default({ start: "", end: "" }),
});

export const initialValues: FoodFormValues = {
    vendorId: "",
    name: "",
    slug: "",
    categoryId: "",
    subCategoryId: "",
    shortDescription: "",
    fullDescription: "",
    foodType: "VEG",
    spiceLevel: "MEDIUM",
    preparationTime: 30,
    status: "DRAFT",
    thumbnail: "",
    coverImage: "",
    galleryImages: [],
    basePrice: 0,
    discountPrice: 0,
    variants: [
        {
            variantName: "",
            sku: "",
            servingSize: "",
            price: 0,
            discountPrice: 0,
            stock: 0,
            isDefault: true,
        },
    ],
    nutrition: {
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        servingSize: "",
    },
    ingredients: [],
    allergens: [],
    labels: [],
    tags: [],
    available: true,
    visible: true,
    featured: false,
    popular: false,
    recommended: false,
    availableDays: [],
    timeSlots: {
        start: "",
        end: "",
    },
};