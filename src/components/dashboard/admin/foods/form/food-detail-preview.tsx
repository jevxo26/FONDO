import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import type { Food } from "@/types/food";

const FOOD_TYPE_LABEL: Record<string, string> = {
  VEG: "Vegetarian",
  NON_VEG: "Non-Vegetarian",
  VEGAN: "Vegan",
  SEAFOOD: "Seafood",
};

export function FoodDetailPreview({ food }: { food: Food }) {
  const variant = food.variants[0];
  const basePrice = variant ? Number(variant.price) : 0;
  const discountPrice = variant?.discountPrice ? Number(variant.discountPrice) : null;
  const discountPercent =
    discountPrice && discountPrice < basePrice
      ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
      : null;
  const rating = food.averageRating ?? 0;
  const isInStock = food.status ? ["ACTIVE", "APPROVED"].includes(food.status.toUpperCase()) : true;
  const price = discountPrice ?? basePrice;

  const meta = [
    { label: "Preparation", value: `${food.preparationTime ?? 0} min` },
    { label: "Serving", value: variant?.servingSize ?? food.servingSize ?? "—" },
    { label: "Calories", value: `${food.calories ?? 0} kcal` },
    { label: "Food Type", value: FOOD_TYPE_LABEL[food.foodType] ?? food.foodType },
    { label: "Spice Level", value: food.spiceLevel ? food.spiceLevel.toLowerCase() : "—" },
    { label: "Protein", value: `${food.protein ?? 0}g` },
  ];

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)]">
      <div className="pointer-events-none absolute -bottom-8 -right-8 size-40 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10 p-4">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
          {food.thumbnail ? (
            <Image src={food.thumbnail} alt={food.name} fill unoptimized className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              isInStock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
            )}
          >
            {isInStock ? "In stock" : "Unavailable"}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-2xl font-normal leading-tight text-secondary-foreground">
          {food.name || "Untitled Food"}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(rating) ? "fill-primary text-primary" : "text-foreground/15",
                )}
              />
            ))}
            <span className="ml-1 font-semibold text-foreground">{rating.toFixed(1)}</span>
          </div>
          {variant?.servingSize && (
            <>
              <span>&middot;</span>
              <span>{variant.servingSize}</span>
            </>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-sans text-2xl font-bold text-secondary-foreground">৳{price}</span>
          {discountPercent && (
            <>
              <span className="font-sans text-base text-muted-foreground line-through">
                ৳{basePrice}
              </span>
              <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>

        {food.variants.length > 1 && (
          <div className="mt-3">
            <span className="text-[11px] font-medium text-muted-foreground">Select Serving:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {food.variants.map((v, index) => (
                <span
                  key={index}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold",
                    index === 0
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 text-muted-foreground",
                  )}
                >
                  {v.name} ({v.servingSize}) · ৳{v.discountPrice ?? v.price}
                </span>
              ))}
            </div>
          </div>
        )}

        {food.shortDescription && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {food.shortDescription}
          </p>
        )}

        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-muted-foreground">{m.label}:</dt>
              <dd className="font-medium capitalize text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm">
          Add to Cart
        </div>
      </div>
    </div>
  );
}
