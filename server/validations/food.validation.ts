import * as yup from "yup";

export const createReviewSchema = yup.object({
  rating: yup.number().min(1).max(5).required("Rating is required (1-5)"),
  review: yup.string().optional(),
});
