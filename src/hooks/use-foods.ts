import { foodService } from "@/services/foods";
import { useQuery } from "@tanstack/react-query";
export function useGetFoods() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: foodService.getFoods,
    staleTime: 1000 * 60 * 5,
  });
}