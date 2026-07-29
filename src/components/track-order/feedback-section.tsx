"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useSubmitFeedback } from "@/store/api/slices/orders-api";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface FeedbackSectionProps {
  orderId: string;
  existing: { rating: number; review: string | null } | null;
}

export default function FeedbackSection({ orderId, existing }: FeedbackSectionProps) {
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [review, setReview] = useState(existing?.review ?? "");
  const [hovered, setHovered] = useState(0);
  const submitFeedback = useSubmitFeedback();
  const isDelivered = true;

  if (!isDelivered) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    submitFeedback.mutate(
      { orderId, rating, review: review.trim() || undefined },
      {
        onSuccess: () => toast.success(existing ? "Feedback updated" : "Feedback submitted"),
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h2 className="font-heading text-lg font-normal text-foreground mb-4">
        {existing ? "Your Feedback" : "Rate Your Experience"}
      </h2>

      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-colors"
          >
            <Star
              className={`size-6 ${star <= (hovered || rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your thoughts (optional)..."
        rows={3}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none mb-4"
      />

      <Button
        onClick={handleSubmit}
        disabled={submitFeedback.isPending || rating === 0}
        className="rounded-xl"
      >
        {submitFeedback.isPending && <Loader2 className="size-4 animate-spin mr-2" />}
        {existing ? "Update Feedback" : "Submit Feedback"}
      </Button>
    </div>
  );
}
