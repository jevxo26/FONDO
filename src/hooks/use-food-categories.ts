"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { FoodCategoriesData } from "@/types/category";

export function useFoodCategories() {
  return useQuery<FoodCategoriesData>({
    queryKey: queryKeys.categories.all,
    queryFn: () => api.get<FoodCategoriesData>("/foods/categories/list"),
    staleTime: 1000 * 60 * 30,
  });
}
