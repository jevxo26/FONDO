import type { FoodCategoriesData } from "@/types/category";
import type { FoodResponse } from "@/types/food";
import type { VendorFood } from "@/types/vendor";
import { api } from "../base-api";

interface FoodsQueryParams {
  page?: number;
  limit?: number;
}

export const foodsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFoods: builder.query<FoodResponse, FoodsQueryParams | void>({
      query: (params) => {
        const { page, limit } = params ?? {};
        return {
          url: "/foods",
          params: {
            ...(page ? { page } : {}),
            ...(limit ? { limit } : {}),
          },
        };
      },
      providesTags: ["Food"],
    }),

    getVendorFoods: builder.query<VendorFood[], void>({
      query: () => "/foods/vendor/foods",
      providesTags: ["Food"],
    }),

    getFoodBySlug: builder.query<FoodResponse, string>({
      query: (slug) => `/foods/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Food" as const, id: slug }],
    }),

    getFoodCategories: builder.query<FoodCategoriesData, void>({
      query: () => "/foods/categories/list",
      providesTags: ["Category"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFoodsQuery, useGetFoodBySlugQuery, useGetFoodCategoriesQuery, useGetVendorFoodsQuery } = foodsApi;

export const useGetFoods = (params?: { page?: number; limit?: number }) => {
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

export const useFoodCategories = () => {
  const { data, isLoading, error } = useGetFoodCategoriesQuery();
  return { data, isLoading, error };
};
