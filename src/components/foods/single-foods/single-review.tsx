import React from 'react';
import { Star, Edit3, Trash2 } from "lucide-react";
import { Review } from '@/types/food-review';
import { User } from '@/types/auth';
interface SingleReviewProps {
    review: Review;
    user: User | null;
    setSelectedReview: (review: Review | null) => void;
    setOpen: (value: boolean) => void;
}

const FoodSingleReview = ({
    review,
    user,
    setSelectedReview,
    setOpen
}: SingleReviewProps) => {

    const isOwner = user?.id === review.customerId;
    const initials = `${review.customer.firstName[0] || ""}${review.customer.lastName[0] || ""}`.toUpperCase();

    return (
        <div
            key={review.id}
            className="p-5 rounded-2xl border border-border/10 bg-card hover:border-primary/30 transition-all flex gap-4 items-start"
        >
            {/* User Avatar Circle */}
            <div className="size-10 bg-background border border-border/10 rounded-full flex items-center justify-center font-heading text-xs font-bold text-primary shrink-0">
                {initials}
            </div>

            {/* Main Content Node */}
            <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                        <h4 className="font-sans text-xs font-bold text-foreground">
                            {review.customer.firstName} {review.customer.lastName}
                        </h4>
                        <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded font-medium inline-block">
                            Verified Purchase
                        </span>
                    </div>

                    {/* Date Metadata & Controls Matrix */}
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground font-sans">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>

                        {isOwner && (
                            <div className="flex gap-1.5 border-l border-border/10 pl-3">
                                <button
                                    onClick={() => {
                                        setSelectedReview(review);
                                        setOpen(true);
                                    }}
                                    className="p-1 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Edit"
                                >
                                    <Edit3 className="size-3.5" />
                                </button>

                                <button
                                    className="p-1 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="size-3.5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Star Matrix */}
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`size-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-foreground/10"
                                }`}
                        />
                    ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs text-muted-foreground font-sans font-light leading-relaxed pt-0.5">
                    {review.review || <span className="italic text-foreground/30">No written comment provided.</span>}
                </p>
            </div>
        </div>
    );
};

export default FoodSingleReview;