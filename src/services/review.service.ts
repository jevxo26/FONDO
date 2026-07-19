import { apiFetch } from "@/lib/api";
import { ReviewListResponse } from "@/types/food-review";

interface CreateReviewPayload {
  foodId: string;
  rating: number;
  review: string;
}

interface UpdateReviewPayload {
  rating: number;
  review: string;
}

export async function getReviews(foodId: string): Promise<ReviewListResponse> {
  return apiFetch<ReviewListResponse>(`/api/foods/${foodId}/reviews`);
}

export async function createReview({
  foodId,
  rating,
  review,
}: CreateReviewPayload) {
  return apiFetch(`/api/foods/${foodId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      rating,
      review,
    }),
  });
}

export async function updateReview(
  reviewId: string,
  payload: UpdateReviewPayload
) {
  return apiFetch(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteReview(reviewId: string) {
  return apiFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
}

export const reviewService = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};