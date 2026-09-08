"use client";

import { useMemo } from "react";
import { ArrowUpDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function OptionChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      aria-pressed={active}
      className="h-8 rounded-full px-3.5 text-[11px] font-semibold uppercase tracking-wider"
    >
      {children}
    </Button>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="px-1 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function FoodsToolbar({ foods, totalCount }: { foods: Food[]; totalCount: number }) {
  const {
    activeCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    foodType,
    setFoodType,
    spiceLevel,
    setSpiceLevel,
    dietType,
    setDietType,
    priceRange,
    setPriceRange,
    resetFilters,
    setCurrentPage,
  } = useFoods();

  const dietOptions = useMemo(() => {
    const set = new Set<string>();
    foods.forEach((f) => f.diets.forEach((d) => set.add(d.dietType)));
    return Array.from(set).sort();
  }, [foods]);

  const resetPage = () => setCurrentPage(1);

  const typeLabel = FOOD_TYPE_OPTIONS.find((o) => o.value === foodType)?.label ?? foodType;
  const spiceLabel = SPICE_OPTIONS.find((o) => o.value === spiceLevel)?.label ?? spiceLevel;
  const priceLabel = PRICE_OPTIONS.find((o) => o.value === priceRange)?.label ?? priceRange;

  const activeFilters = [
    activeCategory !== "All" ? { key: "category", label: activeCategory } : null,
    searchQuery ? { key: "search", label: `"${searchQuery}"` } : null,
    foodType !== "All" ? { key: "type", label: typeLabel } : null,
    spiceLevel !== "All" ? { key: "spice", label: spiceLabel } : null,
    dietType !== "All" ? { key: "diet", label: dietType } : null,
    priceRange !== "All" ? { key: "price", label: priceLabel } : null,
  ].filter((f): f is { key: string; label: string } => f !== null);

  const clearOne = (key: string) => {
    if (key === "category") resetFilters();
    else if (key === "search") setSearchQuery("");
    else if (key === "type") setFoodType("All");
    else if (key === "spice") setSpiceLevel("All");
    else if (key === "diet") setDietType("All");
    else if (key === "price") setPriceRange("All");
    resetPage();
  };

  return (
    <div className="sticky top-16 z-40 border-b border-primary/10 bg-background/85 backdrop-blur-xl transition-shadow duration-300 supports-[backdrop-filter]:bg-background/70 md:top-[88px]">
      <div className="wrapper">
        <div className="flex items-center gap-3 py-2.5">
          <div className="relative hidden w-[180px] sm:block">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                resetPage();
              }}
              placeholder="Search dishes..."
              className="h-9 rounded-full border-border/60 bg-card pl-9 text-sm"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="size-3" />
              </Button>
            )}
          </div>

          <span className="hidden text-[11px] font-semibold tabular-nums whitespace-nowrap text-muted-foreground md:block">
            {totalCount} dishes
          </span>

          <div className="ml-auto flex items-center gap-2">
            <Popover>
              <PopoverTrigger
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-all duration-300",
                  activeFilters.length > 0
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/60 bg-card text-foreground hover:border-primary/40",
                )}
              >
                <SlidersHorizontal className="size-3.5" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge
                    variant="default"
                    className="ml-0.5 h-4 rounded-full px-1.5 text-[9px] font-bold"
                  >
                    {activeFilters.length}
                  </Badge>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3">
                <div className="space-y-4">
                  <FilterGroup label="Type">
                    {FOOD_TYPE_OPTIONS.map((opt) => (
                      <OptionChip
                        key={opt.value}
                        active={foodType === opt.value}
                        onClick={() => {
                          setFoodType(opt.value);
                          resetPage();
                        }}
                      >
                        {opt.label}
                      </OptionChip>
                    ))}
                  </FilterGroup>

                  <FilterGroup label="Spice">
                    {SPICE_OPTIONS.map((opt) => (
                      <OptionChip
                        key={opt.value}
                        active={spiceLevel === opt.value}
                        onClick={() => {
                          setSpiceLevel(opt.value);
                          resetPage();
                        }}
                      >
                        {opt.label}
                      </OptionChip>
                    ))}
                  </FilterGroup>

                  {dietOptions.length > 0 && (
                    <FilterGroup label="Diet">
                      <OptionChip
                        active={dietType === "All"}
                        onClick={() => {
                          setDietType("All");
                          resetPage();
                        }}
                      >
                        All
                      </OptionChip>
                      {dietOptions.map((diet) => (
                        <OptionChip
                          key={diet}
                          active={dietType === diet}
                          onClick={() => {
                            setDietType(diet);
                            resetPage();
                          }}
                        >
                          {diet}
                        </OptionChip>
                      ))}
                    </FilterGroup>
                  )}

                  <FilterGroup label="Price">
                    {PRICE_OPTIONS.map((opt) => (
                      <OptionChip
                        key={opt.value}
                        active={priceRange === opt.value}
                        onClick={() => {
                          setPriceRange(opt.value);
                          resetPage();
                        }}
                      >
                        {opt.label}
                      </OptionChip>
                    ))}
                  </FilterGroup>
                </div>
              </PopoverContent>
            </Popover>

            <Select
              value={sortBy}
              onValueChange={(val) => {
                if (!val) return;
                setSortBy(val);
                resetPage();
              }}
            >
              <SelectTrigger
                size="sm"
                className="h-9 rounded-full border-border/60 bg-card px-3.5"
                aria-label="Sort dishes"
              >
                <ArrowUpDown className="size-3.5 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeFilters.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 rounded-full px-3 text-[11px] font-bold uppercase tracking-wider text-destructive hover:bg-destructive/10"
              >
                <X className="size-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="-mx-2 flex items-center gap-1.5 overflow-x-auto px-2 pb-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="h-6 shrink-0 rounded-full border-primary/20 pl-2.5 pr-1 text-[11px] font-medium text-foreground"
              >
                {filter.label}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => clearOne(filter.key)}
                  aria-label={`Remove ${filter.label} filter`}
                  className="ml-1"
                >
                  <X className="size-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
