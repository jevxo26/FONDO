// types/food-review.ts

export interface FoodRating {
  id: string;
  foodId: string;
  averageRating: number;
  totalReview: number;
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
  updatedAt: Date;
}
export interface Review {
  id: string;
  foodId: string;
  customerId: string;
  orderId: string | null;
  rating: number;
  review: string;
  createdAt: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

export interface ReviewListResponse {
  items: Review[];
}