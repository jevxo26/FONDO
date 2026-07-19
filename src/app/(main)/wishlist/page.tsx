"use client";

import FoodCard from "@/components/common/cards/food-card/food-card";
import { useFavorites } from "@/hooks/use-favorites";
import { setFavoritesCount } from "@/store/slices/counterSlice";
import { useAppDispatch } from "@/store/store";
import { Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function WishlistPage() {
  const { data: favorites = [], isLoading } = useFavorites();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavoritesCount(favorites.length));
  }, [favorites.length, dispatch]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="wrapper">
        <div className="mb-12">
          <h1 className="font-heading text-4xl font-normal text-secondary-foreground tracking-tight">
            My Wishlist
            {items.length > 0 && (
              <span className="text-lg font-sans text-muted-foreground ml-3">({items.length})</span>
            )}
          </h1>
          {!isLoading && (
            <p className="font-sans text-xs text-muted-foreground mt-1">
              {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
            </p>
          )}
        </div>

        {isLoading && favorites.length === 0 ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="max-w-[570px] mx-auto bg-card rounded-[32px] border border-border/40 py-16 px-8 text-center shadow-[var(--shadow-card)] flex flex-col items-center justify-center">
            <div className="size-14 bg-[#FDF2F4] rounded-full flex items-center justify-center mb-5">
              <Heart className="size-6 text-[#E11D48] fill-[#E11D48]" />
            </div>
            <h2 className="font-sans text-lg font-bold text-secondary-foreground tracking-tight mb-2">
              Your wishlist is empty
            </h2>
            <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed mb-8">
              Save items you love for later
            </p>
            <Link
              href="/foods"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-sans text-xs font-semibold text-primary-foreground hover:bg-[#bfa052] shadow-sm"
            >
              Explore Best Sellers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
