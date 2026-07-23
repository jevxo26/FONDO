"use client";
import { useState } from "react";
import { Review } from "@/types/food-review";
import ReviewSummary from "./review-summary";
import ReviewModal from "./review-modal";
import { Button } from "@/components/ui/button";
import FoodSingleReview from "./single-review";
import { useAuth } from "@/hooks/use-auth";

interface ReviewsTabProps {
  allReviews: Review[];
  foodId: string;
}

export default function ReviewsTab({ allReviews, foodId }: ReviewsTabProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <ReviewSummary foodId={foodId} reviews={allReviews} />
      {user && (
        <Button
          onClick={() => {
            setSelectedReview(null);
            setOpen(true);
          }}
          className="w-fit px-5 py-2.5 rounded-xl bg-[#CEA359] hover:bg-[#b08443] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          Write Review
        </Button>
      )}

      {/* Reviews Render Grid Layout */}
      <div className="flex flex-col gap-4">
        {allReviews.map((review) => (
          <FoodSingleReview
            key={review.id}
            review={review}
            user={user}
            setSelectedReview={setSelectedReview}
            setOpen={setOpen}
          />
        ))}
      </div>

      <ReviewModal
        open={open}
        setOpen={(value) => {
          setOpen(value);
          if (!value) {
            setSelectedReview(null);
          }
        }}
        foodId={foodId}
        review={selectedReview}
      />
    </div>
  );
}