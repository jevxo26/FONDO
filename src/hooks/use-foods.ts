"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { FoodResponse } from "@/types/food";

export function useGetFoods(page = 1, limit = 12) {
  return useQuery({
    queryKey: queryKeys.foods.list(page, limit),
    queryFn: () => api.get<FoodResponse>(`/foods?page=${page}&limit=${limit}`),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetFoodBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.foods.bySlug(slug),
    queryFn: () => api.get<FoodResponse>(`/foods/slug/${slug}`),
    enabled: !!slug,
  });
}
