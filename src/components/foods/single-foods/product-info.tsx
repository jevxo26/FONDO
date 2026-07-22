import type { Food } from "@/types/food";
import { motion } from "framer-motion";
import { Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

interface Props {
  food: Food;
  isFavorited: boolean;
  isFavPending: boolean;
  onToggleFav: () => void;
}

export function ProductInfo({ food, isFavorited, isFavPending, onToggleFav, children }: Props & { children?: React.ReactNode }) {
  const discountPercent = food.variants[0]?.discountPrice
    ? Math.round(((Number(food.variants[0].price) - Number(food.variants[0].discountPrice)) / Number(food.variants[0].price)) * 100)
    : null;

  return (
    <motion.div variants={contentVariants} className="lg:col-span-6 flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
          &middot; In stock
        </span>
        <Button variant="ghost" size="icon" onClick={onToggleFav} disabled={isFavPending}
          className="rounded-full border border-border bg-white shadow-sm hover:text-destructive dark:bg-card">
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
          <span className="ml-1 font-semibold text-foreground">{food.rating?.averageRating ?? "4.9"}</span>
          <span>({food.rating?.totalReview ?? 892} reviews)</span>
        </div>
        <span>&middot;</span>
        <span>{food.servingSize}</span>
        <span>&middot;</span>
        <Button variant="ghost" size="sm" className="h-auto gap-1 p-0 hover:text-foreground">
          <Share2 className="size-3.5" /> Share
        </Button>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-sans text-3xl font-bold text-secondary-foreground">
          ৳{food.variants[0]?.discountPrice ?? food.variants[0]?.price ?? 0}
        </span>
        {food.variants[0]?.discountPrice && (
          <span className="font-sans text-lg text-muted-foreground line-through">৳{food.variants[0].price}</span>
        )}
        {discountPercent && (
          <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
            {discountPercent}% off
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-muted-foreground">Free delivery on orders of ৳2,000+</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{food.shortDescription}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-muted-foreground">Preparation:</span><p className="font-medium">{food.preparationTime} min</p></div>
        <div><span className="text-muted-foreground">Serving:</span><p className="font-medium">{food.servingSize}</p></div>
        <div><span className="text-muted-foreground">Calories:</span><p className="font-medium">{food.calories} kcal</p></div>
        <div><span className="text-muted-foreground">Food Type:</span><p className="font-medium capitalize">{food.foodType}</p></div>
        <div><span className="text-muted-foreground">Spice Level:</span><p className="font-medium capitalize">{food.spiceLevel}</p></div>
        <div><span className="text-muted-foreground">Protein:</span><p className="font-medium">{food.protein}g</p></div>
      </div>
      {children}
    </motion.div>
  );
}
