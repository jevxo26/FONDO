"use client";

import { useFavorites } from "@/hooks/use-favorites";
import FoodCard from "@/components/common/cards/food-card/food-card";
import { Loader2 } from "lucide-react";

export default function FavoritesList() {
  const { data: favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const items = favorites ?? [];

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-sans text-sm text-muted-foreground">Your favorites list is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
