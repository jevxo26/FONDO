import { api } from "@/lib/api";

export interface PackageCategory {
  id: string;
  name: string;
  status: string;
}

export const packageService = {
  getCategories: async () => {
    return api.get<PackageCategory[]>("/package/categories");
  },
};