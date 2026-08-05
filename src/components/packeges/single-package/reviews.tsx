"use client";

import React, { useState, useMemo } from "react";
import { Star, Edit2, Trash2, Send, Clock } from "lucide-react";

import {
  useGetPackageReviewsQuery,
  useCreatePackageReviewMutation,
  useUpdatePackageReviewMutation,
  useDeletePackageReviewMutation,
  PackageReviewItem,
} from "@/store/api/slices/packages-api";
import { useAuth } from "@/hooks/use-auth";
import { PackageRating } from "@/types/package";

interface PackageReviewsProps {
  packageId: string;
  rating?: PackageRating;
}

export default function PackageReviews({ packageId, rating }: PackageReviewsProps) {
  // Extract user directly from Auth hook
  const currentUser = useAuth();
  const currentUserId = currentUser?.user?.id;

  // RTK Queries & Mutations
  const { data: allReviews = [], isLoading } = useGetPackageReviewsQuery({ packageId });
  const [createReview, { isLoading: isCreating }] = useCreatePackageReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdatePackageReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeletePackageReviewMutation();

  // Local Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [reviewInput, setReviewInput] = useState<string>("");

  // Filter visible reviews (Approved ones + user's own pending review)
  const visibleReviews = useMemo(() => {
    return allReviews.filter((rev) => {
      if (rev.packageId !== packageId) return false;

      // Public approved reviews
      if (rev.status === "approved" || rev.status === "APPROVED") return true;

      // User's own pending review
      if (currentUserId && rev.customerId === currentUserId) return true;

      return false;
    });
  }, [allReviews, packageId, currentUserId]);

  // Compute breakdown bars using the passed `rating` prop
  const ratingBars = useMemo(() => {
    const total = rating?.totalReview || 0;

    const starsMap = [
      { stars: 5, count: rating?.fiveStar || 0 },
      { stars: 4, count: rating?.fourStar || 0 },
      { stars: 3, count: rating?.threeStar || 0 },
      { stars: 2, count: rating?.twoStar || 0 },
      { stars: 1, count: rating?.oneStar || 0 },
    ];

    return starsMap.map((item) => {
      const pctVal = total > 0 ? Math.round((item.count / total) * 100) : 0;
      return {
        ...item,
        pct: `${pctVal}%`,
      };
    });
  }, [rating]);

  // Check if current logged-in user already wrote a review
  const userExistingReview = useMemo(() => {
    if (!currentUserId) return null;
    return allReviews.find(
      (rev) => rev.customerId === currentUserId && rev.packageId === packageId
    );
  }, [allReviews, currentUserId, packageId]);

  // Handlers
  const handleStartEdit = (rev: PackageReviewItem) => {
    setEditingReviewId(rev.id);
    setRatingInput(rev.rating);
    setReviewInput(rev.review);
    setIsEditing(true);
  };

  const handleCancelForm = () => {
    setIsEditing(false);
    setEditingReviewId(null);
    setRatingInput(5);
    setReviewInput("");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;

    try {
      if (editingReviewId) {
        await updateReview({
          id: editingReviewId,
          rating: ratingInput,
          review: reviewInput,
        }).unwrap();
      } else {
        await createReview({
          packageId,
          rating: ratingInput,
          review: reviewInput,
        }).unwrap();
      }
      handleCancelForm();
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete your review?")) return;
    try {
      await deleteReview(reviewId).unwrap();
      handleCancelForm();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const avgRatingDisplay = (rating?.averageRating ?? 0).toFixed(1);
  const totalReviewsDisplay = rating?.totalReview ?? 0;

  return (
    <section className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-heading text-xl text-foreground">Verified Chronicles</h2>
          <p className="text-[11px] text-muted-foreground/70">
            Authentic testaments from our active collective community
          </p>
        </div>

        {/* Dynamic Write Review Button */}
        {currentUserId && !userExistingReview && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-3.5 py-2 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1.5"
          >
            <Edit2 className="size-3.5" />
            Write Review
          </button>
        )}
      </div>

      {/* Public Rating Header */}
      <div className="bg-background rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="text-center sm:text-left">
          <div className="text-3xl font-heading font-bold text-foreground">
            {isLoading ? "..." : avgRatingDisplay}
          </div>
          <div className="flex text-primary justify-center sm:justify-start my-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${
                  i < Math.round(Number(avgRatingDisplay))
                    ? "fill-current text-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground/60">
            Based on {totalReviewsDisplay} {totalReviewsDisplay === 1 ? "review" : "reviews"}
          </span>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          {ratingBars.map((row) => (
            <div
              key={row.stars}
              className="flex items-center gap-2 text-[10px] text-muted-foreground"
            >
              <span className="w-3 text-right">{row.stars}</span>
              <div className="flex-1 h-1.5 bg-border/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: row.pct }}
                />
              </div>
              <span className="w-6 text-right text-muted-foreground/60">{row.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Review Form */}
      {isEditing && (
        <form
          onSubmit={handleSubmitReview}
          className="p-4 rounded-2xl bg-muted/40 border border-primary/20 space-y-3"
        >
          <h4 className="text-xs font-bold text-foreground">
            {editingReviewId ? "Update Your Review" : "Write a Review"}
          </h4>

          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatingInput(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`size-4 ${
                    star <= ratingInput
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-3 rounded-xl bg-background border border-border/40 text-xs focus:outline-none focus:border-primary"
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleCancelForm}
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-4 py-1.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Send className="size-3" />
              {isCreating || isUpdating ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      )}

      {/* Review Feed */}
      {isLoading ? (
        <p className="text-xs text-muted-foreground py-4 text-center">Loading reviews...</p>
      ) : visibleReviews.length === 0 ? (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No reviews recorded yet for this package.
        </p>
      ) : (
        <div className="space-y-4">
          {visibleReviews.map((rev: PackageReviewItem) => {
            const isOwner = currentUserId && rev.customerId === currentUserId;
            const isPending = rev.status === "pending" || rev.status === "PENDING";
            const displayName = isOwner
              ? "You"
              : rev.customer?.firstName || rev.customer?.name || "Customer";

            return (
              <div
                key={rev.id}
                className="border-b border-border/20 pb-4 last:border-none last:pb-0 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-foreground">{displayName}</span>

                    <div className="flex text-amber-400 ml-1">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="size-2.5 fill-current" />
                      ))}
                    </div>

                    {/* Pending Pill (Visible ONLY to creator) */}
                    {isPending && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[9px] font-medium border border-amber-500/20">
                        <Clock className="size-2.5" />
                        Pending Approval
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground/50">
                      {formatDate(rev.createdAt)}
                    </span>

                    {/* Edit/Delete controls for owner */}
                    {isOwner && !isEditing && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(rev)}
                          className="p-1 hover:text-primary transition-colors text-muted-foreground"
                          title="Edit Review"
                        >
                          <Edit2 className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(rev.id)}
                          disabled={isDeleting}
                          className="p-1 hover:text-destructive transition-colors text-muted-foreground"
                          title="Delete Review"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground/90 leading-relaxed font-sans pl-8">
                  {rev.review}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}