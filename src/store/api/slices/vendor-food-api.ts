// src/store/api/slices/vendor-food-api.ts
import type { VendorFood } from "@/types/vendor";
import { api } from "../base-api";

interface UpdateFoodStatusPayload {
    id: string;
    status: "ACTIVE" | "INACTIVE";
}

// Create Food Payload - matches the form schema
export interface CreateVendorFoodPayload {
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

export const vendorFoodApi = api.injectEndpoints({
    endpoints: (builder) => ({
        updateFoodStatus: builder.mutation<VendorFood, UpdateFoodStatusPayload>({
            query: ({ id, status }) => ({
                url: `/vendor/foods/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["VendorFood"],
        }),

        createVendorFood: builder.mutation<VendorFood, CreateVendorFoodPayload>({
            query: (data) => ({
                url: "/vendor/foods",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["VendorFood"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useUpdateFoodStatusMutation,
    useCreateVendorFoodMutation,
} = vendorFoodApi;