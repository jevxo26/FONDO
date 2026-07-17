import api from "@/lib/axios";

export const foodService = {
  async getCategories() {
    const { data } = await api.get("/foods/categories/list");
    return data.data;
  },
};