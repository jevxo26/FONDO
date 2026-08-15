import type { FoodCategory } from "@/types/category";
import type { Food, FoodResponse } from "@/types/food";
import type { VendorFood } from "@/types/vendor";
import { api } from "../base-api";

interface FoodsQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  subCategoryId?: string;
  search?: string;
  foodType?: string;
  spiceLevel?: string;
  dietType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FoodCategoryParams {
  limit?: number;
  popular?: boolean;
}

export const foodsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFoods: builder.query<FoodResponse, FoodsQueryParams | void>({
      query: (params) => {
        const {
          page,
          limit,
          categoryId,
          subCategoryId,
          search,
          foodType,
          spiceLevel,
          dietType,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder,
        } = params ?? {};
        return {
          url: "/foods",
          params: {
            ...(page ? { page } : {}),
            ...(limit ? { limit } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(subCategoryId ? { subCategoryId } : {}),
            ...(search ? { search } : {}),
            ...(foodType ? { foodType } : {}),
            ...(spiceLevel ? { spiceLevel } : {}),
            ...(dietType ? { dietType } : {}),
            ...(minPrice !== undefined ? { minPrice } : {}),
            ...(maxPrice !== undefined ? { maxPrice } : {}),
            ...(sortBy ? { sortBy } : {}),
            ...(sortOrder ? { sortOrder } : {}),
          },
        };
      },
      providesTags: ["Food"],
    }),

    getVendorFoods: builder.query<VendorFood[], void>({
      query: () => "/foods/vendor/foods",
      providesTags: ["Food"],
    }),

    getVendorFoodsByVendor: builder.query<VendorFood[], { vendorId: string } | void>({
      query: (params) => ({
        url: "/foods/vendor/foods",
        params: params?.vendorId ? { vendorId: params.vendorId } : undefined,
      }),
      providesTags: ["Food"],
    }),

    getFoodBySlug: builder.query<Food, string>({
      query: (slug) => `/foods/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Food" as const, id: slug }],
    }),

    getFoodCategories: builder.query<FoodCategory[], FoodCategoryParams | void>({
      query: (params) => {
        const { limit, popular } = params ?? {};
        return {
          url: "/foods/categories/list",
          params: {
            ...(limit ? { limit } : {}),
            ...(popular !== undefined ? { popular } : {}),
          },
        };
      },
      providesTags: ["Category"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFoodsQuery, useGetFoodBySlugQuery, useGetFoodCategoriesQuery, useGetVendorFoodsQuery, useGetVendorFoodsByVendorQuery } = foodsApi;

export const useGetFoods = (params?: {
  page?: number;
  limit?: number;
  categoryId?: string;
  subCategoryId?: string;
  search?: string;
  foodType?: string;
  spiceLevel?: string;
  dietType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const { data, isLoading, error } = useGetFoodsQuery(params ?? undefined);
  return { data, isLoading, error };
};

export const useGetVendorFoods = () => {
  const { data, isLoading, error } = useGetVendorFoodsQuery();
  return { data, isLoading, error };
};

export const useGetFoodBySlug = (slug: string) => {
  const { data, isLoading, error } = useGetFoodBySlugQuery(slug, { skip: !slug });
  return { data, isLoading, error };
};

export const useFoodCategories = (params?: FoodCategoryParams) => {
  const { data, isLoading, error } = useGetFoodCategoriesQuery(params);
  return { data, isLoading, error };
};
