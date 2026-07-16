export const API = {
  FOODS: "/api/foods",
  FOOD_DETAILS: (id: string) => `/api/foods/${id}`,
  FOOD_BY_SLUG: (slug: string) => `/api/foods/slug/${slug}`,
  FOOD_CATEGORIES: "/api/foods/categories/list",
  FOOD_TAGS: "/api/foods/tags/list",
};