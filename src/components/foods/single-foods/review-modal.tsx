"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/food-review";
import { useCreateReview, useUpdateReview } from "@/store/api/slices/reviews-api";

interface ReviewModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  foodId: string;
  review?: Review | null;
}

export default function ReviewModal({ open, setOpen, foodId, review }: ReviewModalProps) {
  const [rating, setRating] = useState(review?.rating ?? 5);
  const [comment, setComment] = useState(review?.review ?? "");
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (!open) return null;

  const handleSubmit = () => {
    if (review) {
      updateMutation.mutate(
        {
          reviewId: review.id,
          rating,
          review: comment,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setRating(5);
            setComment("");
          },
        },
      );

      return;
    }

    createMutation.mutate(
      {
        foodId,
        rating,
        review: comment,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setRating(5);
          setComment("");
        },
      },
    );
  };

  return (
    <div
      key={review?.id ?? "new"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md rounded-2xl bg-card border border-border/10 p-6 shadow-[var(--shadow-elevated)] space-y-5 relative">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4"
        >
          <X className="size-4" />
        </Button>

        <div>
          <h3 className="font-heading text-xl font-normal text-foreground">
            {review ? "Modify Review" : "Share Your Experience"}
          </h3>
          <p className="font-sans text-[11px] text-muted-foreground mt-1">
            Your feedback updates our culinary matrix instantly.
          </p>
        </div>

        {/* Interactive Luxury Star Selection */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Select Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((item) => {
              const isActive = item <= (hoveredRating ?? rating);
              return (
                <Button
                  key={item}
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setRating(item)}
                  onMouseEnter={() => setHoveredRating(item)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="active:scale-90"
                >
                  <Star
                    className={`size-6 transition-colors ${
                      isActive ? "fill-primary text-primary" : "text-foreground/15"
                    }`}
                  />
                </Button>
              );
            })}
          </div>
        </div>

        {/* Comment Box Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Detailed Feedback
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe the textures, flavors, and presentation..."
            className="w-full bg-background border border-border/10 rounded-xl p-3 text-xs text-foreground placeholder-foreground/30 focus:outline-none focus:border-ring transition-all resize-none"
            rows={4}
          />
        </div>

        {/* Action Call Controls */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Saving..." : review ? "Update" : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
