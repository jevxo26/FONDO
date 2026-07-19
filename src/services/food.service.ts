import { apiFetch } from "@/lib/api";
import { API } from "@/lib/endpoints";
import type { Food, FoodResponse } from "@/types/food";
import type { FoodCategoriesData } from "@/types/category";
import { ReviewListResponse } from "@/types/food-review";

export async function getFoods(page = 1, limit = 12, sortBy?: string): Promise<FoodResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (sortBy) params.set("sortBy", sortBy);
  return apiFetch<FoodResponse>(`${API.FOODS}?${params}`);
}
export async function getReviews(
  foodId: string
): Promise<ReviewListResponse> {
  return apiFetch<ReviewListResponse>(`/api/foods/${foodId}/reviews`);
}

export async function getFood(id: string) {
  return apiFetch<Food>(API.FOOD_DETAILS(id));
}

export async function getFoodBySlug(slug: string) {
  return apiFetch<Food>(API.FOOD_BY_SLUG(slug));
}

export const foodService = {
  getFoods: () => getFoods(),
  getFood: (slug: string) => getFoodBySlug(slug),
  getCategories: () => apiFetch<FoodCategoriesData>(API.FOOD_CATEGORIES),
  getReviews,

};
