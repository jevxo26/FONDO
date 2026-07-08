import { FoodRating, Review } from "@/types/food-review";

export const mockFoodRating: FoodRating = {
  id: "rate_01",
  foodId: "food_kacchi_01",
  averageRating: 4.8,
  totalReview: 1234,
  fiveStar: 415,
  fourStar: 356,
  threeStar: 317,
  twoStar: 220,
  oneStar: 117,
  updatedAt: new Date(),
};

export const mockFoodReviews: Review[] = [
  {
    id: "rev_01",
    foodId: "food_kacchi_01",
    customerId: "cust_elon",
    customerName: "Elon musk",
    customerAvatar: "/avatars/elon.jpg",
    orderId: "ord_101",
    rating: 5,
    review:
      "The kacchi tastes like our family wedding biryani. The rice, the meat, the borhani, everything was just right. Delivered hot in 28 minutes.",
    status: "active",
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
  },
  {
    id: "rev_02",
    foodId: "food_kacchi_01",
    customerId: "cust_elon_02",
    customerName: "Elon musk",
    customerAvatar: "/avatars/elon.jpg",
    orderId: "ord_102",
    rating: 5,
    review:
      "The kacchi tastes like our family wedding biryani. The rice, the meat, the borhani, everything was just right. Delivered hot in 28 minutes.",
    status: "active",
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
  },
  {
    id: "rev_03",
    foodId: "food_kacchi_01",
    customerId: "cust_elon_03",
    customerName: "Elon musk",
    customerAvatar: "/avatars/elon.jpg",
    orderId: "ord_103",
    rating: 5,
    review:
      "Ordered the Family Feast for an evening with my parents. They could not stop talking about the firni. Will order again on Friday.",
    status: "active",
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
  },
];