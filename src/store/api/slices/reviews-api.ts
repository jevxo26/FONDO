import { api } from "../base-api";
import type { ReviewListResponse } from "@/types/food-review";

export const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFoodReviews: builder.query<ReviewListResponse, string>({
      query: (foodId) => `/foods/${foodId}/reviews`,
      providesTags: ["Review"],
    }),

    createReview: builder.mutation<void, { foodId: string; rating: number; review: string }>({
      query: ({ foodId, rating, review }) => ({
        url: `/foods/${foodId}/reviews`,
        method: "POST",
        body: { rating, review },
      }),
      invalidatesTags: ["Review"],
    }),

    updateReview: builder.mutation<void, { reviewId: string; rating: number; review: string }>({
      query: ({ reviewId, rating, review }) => ({
        url: `/reviews/${reviewId}`,
        method: "PATCH",
        body: { rating, review },
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (reviewId) => ({ url: `/reviews/${reviewId}`, method: "DELETE" }),
      invalidatesTags: ["Review"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFoodReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
