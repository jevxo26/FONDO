import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { FoodResponse } from "@/types/food";

export function useFoods(page = 1, limit = 12) {
  return useQuery({
    queryKey: ["foods", page, limit],
    queryFn: () => api.get<FoodResponse>(`/api/foods?page=${page}&limit=${limit}`),
  });
}

export function useFood(id: string) {
  return useQuery({
    queryKey: ["food", id],
    queryFn: () => api.get<import("@/types/food").Food>(`/api/foods/${id}`),
    enabled: !!id,
  });
}

export function useFoodBySlug(slug: string) {
  return useQuery({
    queryKey: ["food", "slug", slug],
    queryFn: () => api.get<import("@/types/food").Food>(`/api/foods/slug/${slug}`),
    enabled: !!slug,
  });
}
