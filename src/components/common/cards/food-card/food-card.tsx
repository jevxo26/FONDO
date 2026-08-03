"use client";

import { Button } from "@/components/ui/button";
import { useFavorites, useRemoveFavorite, useToggleFavorite } from "@/hooks/use-favorites";
import { ArrowUpRight, ChevronDown, Clock, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Food } from "@/types/food";
import AddToCartButton from "./add-to-cart-button";

const FOOD_TYPE_LABEL: Record<string, string> = {
  VEG: "Veg",
  NON_VEG: "Non-Veg",
  VEGAN: "Vegan",
  SEAFOOD: "Seafood",
};

export default function FoodCard({ food }: { food: Food }) {
  const [variantId, setVariantId] = useState(food.variants[0]?.id ?? "");
  const variant = food.variants.find((v) => v.id === variantId) ?? food.variants[0];
  const basePrice = variant ? Number(variant.price) : 0;
  const unitPrice = variant ? Number(variant.discountPrice ?? variant.price) : 0;
  const hasDiscount = Boolean(variant?.discountPrice) && Number(variant.discountPrice) < basePrice;

  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const removeFavorite = useRemoveFavorite();
  const isFavorited = favorites.some((f) => f.id === food.id);

  const highlightPill = food.isPopular ? "Popular" : food.isFeatured ? "Featured" : null;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-4 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
        {food.thumbnail ? (
          <Image
            src={food.thumbnail}
            alt={food.name}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            loading="eager"
            fill
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground" />
        )}

        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {food.labels.slice(0, 2).map((lbl) => (
            <span
              key={lbl.id}
              style={{ backgroundColor: lbl.color }}
              className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm"
            >
              {lbl.label}
            </span>
          ))}
          {highlightPill && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
              {highlightPill}
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => (isFavorited ? removeFavorite : toggleFavorite).mutate(food)}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 size-9 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:text-destructive"
        >
          <Heart className={`size-4 ${isFavorited ? "fill-destructive text-destructive" : ""}`} />
        </Button>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-4 transition-all duration-300 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-active:opacity-100 group-active:scale-100">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-foreground/90 px-4 py-2.5 text-background shadow-[var(--shadow-elevated)] border border-background/10 backdrop-blur-md">
            <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-primary">
              <ShoppingBag className="size-4 text-foreground" />
            </div>
            <span className="font-sans text-xs font-medium">
              {food.servingSize ?? ""} - ৳{unitPrice}
            </span>
            <Link
              href={`/foods/${food.slug}`}
              aria-label={`View ${food.name}`}
              className="ml-1 flex size-8 items-center justify-center rounded-full bg-background/20 transition-colors hover:bg-background/40"
            >
              <ArrowUpRight className="size-5 text-background" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
          <span className="text-primary">{food.category?.name}</span>
          {food.subCategory?.name && (
            <>
              <span className="size-0.5 rounded-full bg-primary/40" />
              <span className="text-muted-foreground">{food.subCategory.name}</span>
            </>
          )}
          <span className="ml-auto text-muted-foreground">
            {FOOD_TYPE_LABEL[food.foodType] ?? food.foodType}
          </span>
        </div>

        <div className="mt-1.5 flex items-start justify-between gap-2">
          <Link
            href={`/foods/${food.slug}`}
            className="font-sans text-lg font-semibold leading-snug text-secondary-foreground line-clamp-1 transition-colors hover:text-primary"
          >
            {food.name}
          </Link>
          <div className="whitespace-nowrap text-right">
            <span className="font-sans text-lg font-bold text-secondary-foreground">৳{unitPrice}</span>
            {hasDiscount && (
              <span className="block text-[11px] text-muted-foreground line-through">৳{basePrice}</span>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{food.averageRating ?? "4.9"}</span>
            {food.totalReview ? (
              <span className="text-muted-foreground/70">({food.totalReview})</span>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>{food.preparationTime ?? 0} min</span>
          </div>
        </div>

        <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
          {food.shortDescription ?? ""}
        </p>

        {food.variants.length > 1 && (
          <div className="relative mt-4">
            <select
              value={variant?.id}
              onChange={(e) => setVariantId(e.target.value)}
              aria-label={`Select variant for ${food.name}`}
              className="w-full appearance-none rounded-xl border border-border/60 bg-background px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 cursor-pointer"
            >
              {food.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.servingSize}) - ৳{v.discountPrice ?? v.price}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2 text-muted-foreground/60" />
          </div>
        )}

        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <AddToCartButton foodId={food.id} price={unitPrice} />
      </div>
    </div>
  );
}
