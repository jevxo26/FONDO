import { useQuery } from "@tanstack/react-query";
import { foodService } from "@/services/food.service";

export function useFoodCategories() {
  return useQuery({
    queryKey: ["food-categories"],
    queryFn: foodService.getCategories,
    staleTime: 1000 * 60 * 30,
  });
}