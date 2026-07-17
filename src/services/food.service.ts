import { apiFetch } from "@/lib/api";
import { API } from "@/lib/endpoints";
import { Food, FoodResponse } from "@/types/food";

export async function getFoods(page = 1, limit = 12, sortBy?: string): Promise<FoodResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (sortBy) params.set("sortBy", sortBy);
  return apiFetch<FoodResponse>(`${API.FOODS}?${params}`);
}

export async function getFood(id: string) {
  return apiFetch<Food>(API.FOOD_DETAILS(id));
}

export async function getFoodBySlug(slug: string) {
  return apiFetch<Food>(API.FOOD_BY_SLUG(slug));
}
