"use client";

import { Star } from "lucide-react";
import { FoodRating, Review } from "@/types/food-review";

interface ReviewSummaryProps {
  foodId: string;
  reviews: Review[];
}

export function calculateRating(foodId: string, reviews: Review[]): FoodRating {
  const totalReview = reviews.length;
  const ratingCount = {
    fiveStar: reviews.filter((r) => r.rating === 5).length,
    fourStar: reviews.filter((r) => r.rating === 4).length,
    threeStar: reviews.filter((r) => r.rating === 3).length,
    twoStar: reviews.filter((r) => r.rating === 2).length,
    oneStar: reviews.filter((r) => r.rating === 1).length,
  };

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);

  return {
    id: foodId,
    foodId,
    averageRating: totalReview === 0 ? 0 : Number((totalRating / totalReview).toFixed(1)),
    totalReview,
    ...ratingCount,
    updatedAt: new Date(),
  };
}

export default function ReviewSummary({ foodId, reviews }: ReviewSummaryProps) {
  const ratingData = calculateRating(foodId, reviews);

  const getPercentage = (count: number) => {
    if (!ratingData.totalReview) return 0;
    return (count / ratingData.totalReview) * 100;
  };

  const ratingRows = [
    { star: 5, count: ratingData.fiveStar },
    { star: 4, count: ratingData.fourStar },
    { star: 3, count: ratingData.threeStar },
    { star: 2, count: ratingData.twoStar },
    { star: 1, count: ratingData.oneStar },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#16100C]/10 pb-8 bg-[#FAF5EB]/30 p-6 rounded-2xl">
      {/* Left Column: Average Matrix */}
      <div className="md:col-span-4 flex flex-col items-center justify-center text-center md:border-r border-[#16100C]/10 py-4">
        <h2 className="font-fraunces text-6xl font-normal text-[#16100C]">
          {ratingData.averageRating.toFixed(1)}
        </h2>
        <div className="flex items-center gap-0.5 mt-3">
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index < Math.round(ratingData.averageRating);
            return (
              <Star
                key={index}
                className={`size-4 ${isFilled ? "fill-[#CEA359] text-[#CEA359]" : "text-[#16100C]/15"}`}
              />
            );
          })}
        </div>
        <span className="text-[11px] font-sans tracking-wider uppercase font-medium text-[#16100C]/50 mt-3">
          {ratingData.totalReview.toLocaleString()} Verified Reviews
        </span>
      </div>

      {/* Right Column: Progress Bars */}
      <div className="md:col-span-8 flex flex-col gap-2.5">
        {ratingRows.map((row) => (
          <div key={row.star} className="flex items-center gap-4 text-xs font-sans text-[#16100C]/70">
            <span className="w-3 font-bold">{row.star}</span>
            <Star className="size-3.5 fill-[#CEA359] text-[#CEA359] shrink-0" />
            <div className="flex-1 h-1.5 bg-[#16100C]/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#CEA359] rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(row.count)}%` }}
              />
            </div>
            <span className="w-8 text-right text-[11px] font-medium text-[#16100C]/40">
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}