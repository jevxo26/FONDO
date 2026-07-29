import type { FoodCategoriesData } from "@/types/category";
import type { FoodResponse } from "@/types/food";
import { api } from "../base-api";

interface FoodsQueryParams {
  page?: number;
  limit?: number;
}

export const foodsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFoods: builder.query<FoodResponse, FoodsQueryParams | void>({
      query: (params) => {
        const { page = 1, limit = 12 } = params ?? {};
        return { url: "/foods", params: { page, limit } };
      },
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

export const { useGetFoodsQuery, useGetFoodBySlugQuery, useGetFoodCategoriesQuery } = foodsApi;

export const useGetFoods = (params?: { page?: number; limit?: number }) => {
  const { data, isLoading, error } = useGetFoodsQuery(params ?? undefined);
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
