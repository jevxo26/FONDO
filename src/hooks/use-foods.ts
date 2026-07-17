import { foodService, GetFoodsParams } from "@/services/food.service";
import { useQuery } from "@tanstack/react-query";

export function useGetFoods(params: GetFoodsParams) {
  return useQuery({
    queryKey: ["foods", params],
    queryFn: () => foodService.getFoods(params),
    placeholderData: (previousData) => previousData,
  });
}