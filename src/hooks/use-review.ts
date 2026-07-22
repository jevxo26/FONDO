"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { ReviewListResponse } from "@/types/food-review";

export function useFoodReviews(foodId: string) {
  return useQuery({
    queryKey: queryKeys.reviews.byFood(foodId),
    queryFn: () => api.get<ReviewListResponse>(`/foods/${foodId}/reviews`),
    enabled: !!foodId,
  });
}

export function useCreateReview(foodId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { foodId: string; rating: number; review: string }) =>
      api.post(`/foods/${data.foodId}/reviews`, { rating: data.rating, review: data.review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byFood(foodId) });
    },
  });
}

export function useUpdateReview(foodId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, rating, review }: { reviewId: string; rating: number; review: string }) =>
      api.patch(`/reviews/${reviewId}`, { rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byFood(foodId) });
    },
  });
}

export function useDeleteReview(foodId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => api.delete(`/reviews/${reviewId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byFood(foodId) });
    },
  });
}
