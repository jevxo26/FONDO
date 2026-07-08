import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeMap[size],
            i < Math.floor(rating)
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
