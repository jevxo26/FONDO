import { useQuery } from "@tanstack/react-query";
import { foodService } from "@/services/foods";
import type { FoodCategoriesData } from "@/types/category";

export function useFoodCategories() {
  return useQuery<FoodCategoriesData>({
    queryKey: ["food-categories"],
    queryFn: foodService.getCategories,
    staleTime: 1000 * 60 * 30,
  });
}