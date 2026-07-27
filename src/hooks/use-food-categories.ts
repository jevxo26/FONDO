"use client";

import { useGetFoodCategoriesQuery } from "@/store/api/slices/foods-api";

export function useFoodCategories() {
  const { data, isLoading, error } = useGetFoodCategoriesQuery(undefined);
  return { data, isLoading, error };
}
