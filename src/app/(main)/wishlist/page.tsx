"use client";

import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import FoodCard from "@/components/common/cards/food-card/food-card";

export default function WishlistPage() {
  const { data: favorites, isLoading } = useFavorites();
  const items = favorites ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="wrapper">
        <div className="mb-12">
          <h1 className="font-fraunces text-4xl font-normal text-secondary-foreground tracking-tight">
            My Wishlist
            {items.length > 0 && (
              <span className="text-lg font-sans text-muted-foreground ml-3">({items.length})</span>
            )}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="max-w-[570px] mx-auto bg-card rounded-[32px] border border-border/40 py-16 px-8 text-center shadow-[var(--shadow-card)] flex flex-col items-center justify-center">
            <div className="size-14 bg-destructive/10 rounded-full flex items-center justify-center mb-5">
              <Heart className="size-6 text-destructive" />
            </div>
            <h2 className="font-sans text-lg font-bold text-secondary-foreground tracking-tight mb-2">
              Your wishlist is empty
            </h2>
            <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed mb-8">
              Save items you love for later
            </p>
            <Link
              href="/menu"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-sans text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm"
            >
              Explore Best Sellers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
