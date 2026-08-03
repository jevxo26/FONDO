"use client";

import type { Food } from "@/types/food";
import { Award } from "lucide-react";
import FoodCard from "@/components/common/cards/food-card/food-card";

interface FoodGridProps {
  filteredFoods: Food[];
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

const FoodGrid = ({ filteredFoods, onClearFilters, hasActiveFilters }: FoodGridProps) => {
  if (filteredFoods.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-border/60 bg-card py-20 shadow-[var(--shadow-card)]">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Award className="size-6 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">No dishes match your filters.</p>
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="rounded-full border border-border/60 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {filteredFoods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodGrid;
