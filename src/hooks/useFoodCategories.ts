export async function getCategories() {
  const res = await fetch("/api/foods/categories/list");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return data.data.items;
}import { useQuery } from "@tanstack/react-query";
import { foodService } from "@/services/food.service";

export function useFoodCategories() {
  return useQuery({
    queryKey: ["food-categories"],
    queryFn: foodService.getCategories,

    staleTime: 1000 * 60 * 30, // 30 min

    gcTime: 1000 * 60 * 60,
  });
}