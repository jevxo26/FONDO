import type { Food, Variant } from "@/types/food";
import { motion } from "framer-motion";
import { Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

interface Props {
  food: Food;
  selectedVariant: Variant;
  onVariantChange: (variant: Variant) => void;
  isFavorited: boolean;
  isFavPending: boolean;
  onToggleFav: () => void;
}

export function ProductInfo({
  food,
  selectedVariant,
  onVariantChange,
  isFavorited,
  isFavPending,
  onToggleFav,
  children,
}: Props & { children?: React.ReactNode }) {
  const basePrice = Number(selectedVariant.price);
  const discountPrice = selectedVariant.discountPrice
    ? Number(selectedVariant.discountPrice)
    : null;
  const discountPercent =
    discountPrice && discountPrice < basePrice
      ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
      : null;

  return (
    <motion.div variants={contentVariants} className="lg:col-span-6 flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
          &middot; In stock
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFav}
          disabled={isFavPending}
          className="rounded-full border border-border bg-card shadow-sm hover:text-destructive"
        >
          <Heart className={`size-4 ${isFavorited ? "fill-destructive text-destructive" : ""}`} />
        </Button>
      </div>

      <h1 className="mt-3 font-heading text-3xl font-normal tracking-tight text-secondary-foreground sm:text-4xl leading-tight">
        {food.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-primary text-primary" />
          ))}
          <span className="ml-1 font-semibold text-foreground">
            {food.averageRating ?? "4.9"}
          </span>
          <span>({food.totalReview ?? 892} reviews)</span>
        </div>
        <span>&middot;</span>
        <span>{selectedVariant.servingSize ?? food.servingSize ?? ""}</span>
        <span>&middot;</span>
        <Button variant="ghost" size="sm" className="h-auto gap-1 p-0 hover:text-foreground">
          <Share2 className="size-3.5" /> Share
        </Button>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-sans text-3xl font-bold text-secondary-foreground">
          ৳{discountPrice ?? basePrice}
        </span>
        {discountPercent && (
          <>
            <span className="font-sans text-lg text-muted-foreground line-through">
              ৳{basePrice}
            </span>
            <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
              {discountPercent}% off
            </span>
          </>
        )}
      </div>

      {food.variants.length > 1 && (
        <div className="mt-4">
          <span className="text-xs font-medium text-muted-foreground">Select Serving:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {food.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => onVariantChange(v)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
                  v.id === selectedVariant.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {v.name} ({v.servingSize})
                <span className="ml-1.5 text-primary">
                  ৳{v.discountPrice ?? v.price}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-1 text-xs text-muted-foreground">Free delivery on orders of ৳2,000+</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {food.shortDescription ?? ""}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Preparation:</span>
          <p className="font-medium">{food.preparationTime ?? 0} min</p>
        </div>
        <div>
          <span className="text-muted-foreground">Serving:</span>
          <p className="font-medium">{selectedVariant.servingSize ?? food.servingSize ?? ""}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Calories:</span>
          <p className="font-medium">{food.calories ?? 0} kcal</p>
        </div>
        <div>
          <span className="text-muted-foreground">Food Type:</span>
          <p className="font-medium capitalize">{food.foodType}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Spice Level:</span>
          <p className="font-medium capitalize">{food.spiceLevel}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Protein:</span>
          <p className="font-medium">{food.protein ?? 0}g</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
