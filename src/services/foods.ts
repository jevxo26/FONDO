import { apiFetch } from "@/lib/api";
import type { Food, FoodResponse } from "@/types/food";
import type { FoodCategoriesData } from "@/types/category";
import type { ServerFetchOptions } from "@/lib/api";

export async function getFoods(
  page = 1,
  limit = 12,
  sortBy?: string,
  options?: ServerFetchOptions,
): Promise<FoodResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (sortBy) params.set("sortBy", sortBy);
  return apiFetch<FoodResponse>(`/api/foods?${params}`, options);
}

export async function getFood(id: string) {
  return apiFetch<Food>(`/api/foods/${id}`);
}

export async function getFoodBySlug(slug: string) {
  return apiFetch<Food>(`/api/foods/slug/${slug}`);
}

export const foodService = {
  getFoods: () => getFoods(),
  getFood: (slug: string) => getFoodBySlug(slug),
  getCategories: () => apiFetch<FoodCategoriesData>("/api/foods/categories/list"),
};
