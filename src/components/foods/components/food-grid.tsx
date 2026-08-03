"use client";

import type { Food } from "@/types/food";
import { Award, ChevronDown, Clock, Plus, ShoppingBag, Star, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAddToCart } from "@/store/api/slices/cart-api";
import { useFavorites, useRemoveFavorite, useToggleFavorite } from "@/hooks/use-favorites";

interface FoodGridProps {
  filteredFoods: Food[];
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

const FoodGrid = ({ filteredFoods, onClearFilters, hasActiveFilters }: FoodGridProps) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});
  const addToCart = useAddToCart();
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const removeFavorite = useRemoveFavorite();

  const handleVariantChange = (foodId: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [foodId]: variantId }));
  };

  const handleAddToCart = (food: Food, variantId: string) => {
    if (addToCart.isPending || justAdded[food.id]) return;
    const variant = food.variants.find((v) => v.id === variantId) ?? food.variants[0];
    const unitPrice = Number(variant.discountPrice ?? variant.price ?? 0);
    setJustAdded((prev) => ({ ...prev, [food.id]: true }));
    addToCart.mutate({ foodId: food.id, quantity: 1, unitPrice });
    setTimeout(() => setJustAdded((prev) => ({ ...prev, [food.id]: false })), 400);
  };

  const handleToggleFav = (food: Food) => {
    const isFavorited = favorites.some((f) => f.id === food.id);
    (isFavorited ? removeFavorite : toggleFavorite).mutate(food);
  };

  return (
    <div>
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFoods.map((food: Food) => {
            const activeVariantId = selectedVariants[food.id] || food.variants[0].id;
            const currentVariant =
              food.variants.find((v) => v.id === activeVariantId) || food.variants[0];
            const isFavorited = favorites.some((f) => f.id === food.id);

            return (
              <div
                key={food.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:scale-[1.01] hover:border-primary/30"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/60" />

                <div>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Link href={`/foods/${food.slug}`}>
                      <Image
                        src={food.thumbnail ?? "/placeholder.svg"}
                        alt={food.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {food.labels.map((lbl, i) => (
                      <span
                        key={lbl.id}
                        style={{ backgroundColor: lbl.color }}
                        className={cn(
                          "absolute top-3 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider",
                          i === 0 ? "left-3" : "left-[calc(theme(spacing.3)+var(--label-offset))]",
                        )}
                      >
                        {lbl.label}
                      </span>
                    ))}

                    <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                      <button
                        onClick={() => handleToggleFav(food)}
                        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                        className="flex size-8 items-center justify-center rounded-full bg-background/90 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                      >
                        <Heart
                          className={cn(
                            "size-3.5 transition-colors",
                            isFavorited ? "fill-destructive text-destructive" : "text-foreground",
                          )}
                        />
                      </button>
                      <span className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm">
                        <Clock className="size-3 text-primary" />
                        {food.preparationTime} min
                      </span>
                    </div>

                    {food.averageRating && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm">
                        <Star className="size-3 fill-primary text-primary" />
                        {food.averageRating}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/foods/${food.slug}`}>
                          <h4 className="font-heading text-base font-semibold text-foreground leading-tight hover:text-primary transition-colors">
                            {food.name}
                          </h4>
                        </Link>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                          {food.category?.name}
                          {food.subCategory?.name ? ` / ${food.subCategory.name}` : ""}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {food.shortDescription ?? ""}
                    </p>

                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: "Cal", value: food.calories },
                        { label: "Prot", value: `${food.protein}g` },
                        { label: "Fat", value: `${food.fat}g` },
                        { label: "Carb", value: `${food.carbohydrate}g` },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-border/50 bg-muted/30 p-2 text-center transition-colors duration-300 group-hover:border-primary/20"
                        >
                          <span className="block text-[9px] font-bold text-foreground">
                            {item.value}
                          </span>
                          <span className="block text-[8px] uppercase tracking-wider text-muted-foreground/70">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {food.variants.length > 1 && (
                      <div className="relative">
                        <select
                          value={activeVariantId}
                          onChange={(e) => handleVariantChange(food.id, e.target.value)}
                          className="w-full appearance-none rounded-xl border border-border/60 bg-background px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                        >
                          {food.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} ({v.servingSize})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/60" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto border-t border-border/40 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-muted-foreground block">
                        Price
                      </span>
                      <span className="font-heading text-lg font-bold text-foreground">
                        ৳{currentVariant.discountPrice ?? currentVariant.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(food, activeVariantId)}
                      disabled={justAdded[food.id] || addToCart.isPending}
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.97] disabled:opacity-70"
                    >
                      <ShoppingBag className="size-3.5" />
                      {justAdded[food.id] ? "Added" : "Add to Cart"}
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground/20">
                        <Plus className="size-3 stroke-[2.5]" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Award className="size-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">No dishes match your search.</p>
          {hasActiveFilters && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="rounded-full border border-border/60 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodGrid;
