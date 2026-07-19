import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";

export function useFoodReviews(foodId: string) {
  return useQuery({
    queryKey: ["food-reviews", foodId],
    queryFn: () => reviewService.getReviews(foodId),
    enabled: !!foodId,
  });
}

export function useCreateReview(foodId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food-reviews", foodId],
      });
    },
  });
}

export function useUpdateReview(foodId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      rating,
      review,
    }: {
      reviewId: string;
      rating: number;
      review: string;
    }) =>
      reviewService.updateReview(reviewId, {
        rating,
        review,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food-reviews", foodId],
      });
    },
  });
}

export function useDeleteReview(foodId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food-reviews", foodId],
      });
    },
  });
}