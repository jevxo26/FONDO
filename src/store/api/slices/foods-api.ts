import { api } from "../base-api";
import type { FoodResponse } from "@/types/food";
import type { FoodCategoriesData } from "@/types/category";

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
  overrideExisting: false,
});

export const { useGetFoodsQuery, useGetFoodBySlugQuery, useGetFoodCategoriesQuery } = foodsApi;
