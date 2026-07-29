"use client";

import {
  useGetFoodReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/store/api/slices/reviews-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useFoodReviews(foodId: string) {
  const { data, isLoading, error } = useGetFoodReviewsQuery(foodId, { skip: !foodId });
  return { data, isLoading, error };
}

export function useCreateReview() {
  const [trigger, { isLoading }] = useCreateReviewMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateReview() {
  const [trigger, { isLoading }] = useUpdateReviewMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteReview() {
  const [trigger, { isLoading }] = useDeleteReviewMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
