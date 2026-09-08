"use client";

import FoodCard from "@/components/common/food-card/food-card";
import type { Food } from "@/types/food";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { SearchX } from "lucide-react";

interface FoodGridProps {
  filteredFoods: Food[];
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

const FoodGrid = ({ filteredFoods, onClearFilters, hasActiveFilters }: FoodGridProps) => {
  if (filteredFoods.length === 0) {
    return (
      <Empty className="min-h-[320px] rounded-4xl border border-border/60 bg-card py-16 shadow-[var(--shadow-card)]">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-14 rounded-2xl bg-secondary [&_svg]:size-7 [&_svg]:text-muted-foreground">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle className="font-heading text-lg font-semibold">No dishes found</EmptyTitle>
          <EmptyDescription>
            Nothing matches your current search or filters. Try a different keyword or broaden your
            filters.
          </EmptyDescription>
        </EmptyHeader>
        {hasActiveFilters && onClearFilters && (
          <EmptyContent>
            <Button
              type="button"
              variant="outline"
              onClick={onClearFilters}
              className="rounded-full px-5"
            >
              Clear all filters
            </Button>
          </EmptyContent>
        )}
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {filteredFoods.map((food) => (
        <FoodCard key={food.id} food={food} lazy />
      ))}
    </div>
  );
};

export default FoodGrid;
