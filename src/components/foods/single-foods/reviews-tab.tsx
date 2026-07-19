import { mockFoodReviews } from "@/data/review";
import { FoodRating } from "@/types/food-review";
import { Star } from "lucide-react";

interface ratingData {
  ratingData: FoodRating;
}

const ReviewsTab = ({ ratingData }: ratingData) => {
  const allReviews = mockFoodReviews;
  const getPercentage = (count: number) => {
    return (count / ratingData.totalReview) * 100;
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-border/40 pb-8">
        <div className="md:col-span-3 flex flex-col items-center justify-center text-center border-r border-border/40 py-2">
          <h2 className="font-heading text-5xl font-bold text-secondary-foreground">
            {ratingData.averageRating.toFixed(1)}
          </h2>
          <div className="flex items-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-[#CEA359] text-[#CEA359]" />
            ))}
          </div>
          <span className="font-sans text-xs text-muted-foreground mt-2">
            {ratingData.totalReview.toLocaleString()} reviews
          </span>
        </div>

        <div className="md:col-span-9 flex flex-col gap-2 px-0 md:px-6">
          {[
            { star: 5, count: ratingData.fiveStar },
            { star: 4, count: ratingData.fourStar },
            { star: 3, count: ratingData.threeStar },
            { star: 2, count: ratingData.twoStar },
            { star: 1, count: ratingData.oneStar },
          ].map((row) => (
            <div key={row.star} className="flex items-center gap-3 text-xs font-sans">
              <span className="w-3 text-muted-foreground font-medium text-right">{row.star}</span>
              <Star className="size-3 fill-[#CEA359] text-[#CEA359] shrink-0" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[rgb(206,163,89)] rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(row.count)}%` }}
                />
              </div>
              <span className="w-8 text-muted-foreground text-right font-medium">{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {allReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-3 p-5 rounded-2xl border border-border/40 bg-muted/20 dark:bg-muted/5 transition-all hover:border-border"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full bg-muted border border-border">
                  <div className="w-full h-full bg-[#16100C] text-white flex items-center justify-center font-sans text-xs font-bold uppercase">
                    {review.customerName.charAt(0)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold text-secondary-foreground leading-tight">
                    {review.customerName}
                  </span>
                  <span className="font-sans text-[11px] text-emerald-600 font-medium tracking-wide">
                    Verified Purchase
                  </span>
                </div>
              </div>
              <span className="font-sans text-xs text-muted-foreground whitespace-nowrap">
                {review.createdAt}
              </span>
            </div>

            {/* ইউজার স্টার রেটিং */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-[#CEA359] text-[#CEA359]" />
              ))}
            </div>

            {/* কমেন্ট বডি টেক্সট */}
            <p className="font-sans text-sm leading-relaxed text-muted-foreground pl-0.5">
              &quot;{review.review}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
