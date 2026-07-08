import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    price: "text-sm font-bold",
    original: "text-xs line-through",
    currency: "text-xs",
  },
  md: {
    price: "text-base font-bold",
    original: "text-sm line-through",
    currency: "text-sm",
  },
  lg: {
    price: "text-lg font-bold",
    original: "text-base line-through",
    currency: "text-base",
  },
};

export function PriceTag({
  price,
  originalPrice,
  currency = "৳",
  size = "md",
  className,
}: PriceTagProps) {
  const s = sizeClasses[size];

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn(s.price, "text-foreground")}>
        <span className={cn(s.currency, "text-muted-foreground")}>
          {currency}
        </span>
        {price}
      </span>
      {originalPrice && (
        <span className={cn(s.original, "text-muted-foreground")}>
          {currency}
          {originalPrice}
        </span>
      )}
    </div>
  );
}
