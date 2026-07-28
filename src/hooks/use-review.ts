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

export function useCreateReview(_foodId: string) {
  const [trigger, { isLoading }] = useCreateReviewMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateReview(_foodId: string) {
  const [trigger, { isLoading }] = useUpdateReviewMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteReview(_foodId: string) {
  const [trigger, { isLoading }] = useDeleteReviewMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
