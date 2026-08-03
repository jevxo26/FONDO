"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  useFoods,
  type FoodTypeFilter,
  type PriceFilter,
  type SpiceFilter,
} from "./foods-provider";
import type { Food } from "@/types/food";

const FOOD_TYPE_OPTIONS: { value: FoodTypeFilter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "VEG", label: "Veg" },
  { value: "NON_VEG", label: "Non-Veg" },
  { value: "VEGAN", label: "Vegan" },
];

const SPICE_OPTIONS: { value: SpiceFilter; label: string }[] = [
  { value: "All", label: "Any Spice" },
  { value: "MILD", label: "Mild" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HOT", label: "Hot" },
];

const PRICE_OPTIONS: { value: PriceFilter; label: string }[] = [
  { value: "All", label: "Any Price" },
  { value: "under-300", label: "Under ৳300" },
  { value: "300-600", label: "৳300 – ৳600" },
  { value: "600-plus", label: "৳600+" },
];

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-badge)]"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function FoodFilters({ foods }: { foods: Food[] }) {
  const {
    foodType,
    setFoodType,
    spiceLevel,
    setSpiceLevel,
    dietType,
    setDietType,
    priceRange,
    setPriceRange,
    setCurrentPage,
  } = useFoods();

  const dietOptions = useMemo(() => {
    const set = new Set<string>();
    foods.forEach((f) => f.diets.forEach((d) => set.add(d.dietType)));
    return Array.from(set).sort();
  }, [foods]);

  const resetPage = () => setCurrentPage(1);

  const activeCount =
    (foodType !== "All" ? 1 : 0) +
    (spiceLevel !== "All" ? 1 : 0) +
    (dietType !== "All" ? 1 : 0) +
    (priceRange !== "All" ? 1 : 0);

  const clearAll = () => {
    setFoodType("All");
    setSpiceLevel("All");
    setDietType("All");
    setPriceRange("All");
    resetPage();
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-border/40 bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-1.5">
        <SlidersHorizontal className="size-4 text-primary" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
          Filters
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {FOOD_TYPE_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            active={foodType === opt.value}
            onClick={() => {
              setFoodType(opt.value);
              resetPage();
            }}
          >
            {opt.label}
          </FilterChip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {SPICE_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            active={spiceLevel === opt.value}
            onClick={() => {
              setSpiceLevel(opt.value);
              resetPage();
            }}
          >
            {opt.label}
          </FilterChip>
        ))}
      </div>

      {dietOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterChip
            active={dietType === "All"}
            onClick={() => {
              setDietType("All");
              resetPage();
            }}
          >
            All Diets
          </FilterChip>
          {dietOptions.map((diet) => (
            <FilterChip
              key={diet}
              active={dietType === diet}
              onClick={() => {
                setDietType(diet);
                resetPage();
              }}
            >
              {diet}
            </FilterChip>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {PRICE_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            active={priceRange === opt.value}
            onClick={() => {
              setPriceRange(opt.value);
              resetPage();
            }}
          >
            {opt.label}
          </FilterChip>
        ))}
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-destructive transition-all duration-300 hover:bg-destructive/10 active:scale-95"
        >
          <X className="size-3.5" />
          Clear ({activeCount})
        </button>
      )}
    </div>
  );
}
