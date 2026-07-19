import { foodService } from "@/services/food.service";
import { ReviewListResponse } from "@/types/food-review";
import { useQuery } from "@tanstack/react-query";

export function useFoodReviews(foodId: string) {
  return useQuery<ReviewListResponse>({
    queryKey: ["food-reviews", foodId],
    queryFn: () => foodService.getReviews(foodId),
    enabled: !!foodId,
  });
}