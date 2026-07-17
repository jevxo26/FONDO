import api from "@/lib/axios";

export interface GetFoodsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
}

export const foodService = {
  // Get all foods
  async getFoods(params: GetFoodsParams) {
    const { data } = await api.get("/foods", {
      params,
    });

    return data.data;
  },

  // Get single food
  async getFood(slug: string) {
    const { data } = await api.get(`/foods/slug/${slug}`);
    return data.data;
  },

  // Get food categories
  async getCategories() {
    const { data } = await api.get("/foods/categories/list");
    return data.data;
  },

  // Get reviews
  async getReviews(foodId: string) {
    const { data } = await api.get(`/foods/${foodId}/reviews`);
    return data.data;
  },

  // Favorite
  async addFavorite(foodId: string) {
    const { data } = await api.post(`/foods/${foodId}/favorite`);
    return data.data;
  },

  async removeFavorite(foodId: string) {
    const { data } = await api.delete(`/foods/${foodId}/favorite`);
    return data.data;
  },
};