"use client";

import { useDeferredValue, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useFoods, type PriceFilter } from "./foods-provider";
import { useFoodCategories, useGetFoods } from "@/store/api/slices/foods-api";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";
import type { Food } from "@/types/food";
import Categories, { CategoryChips } from "./categories";
import { FoodsToolbar } from "./foods-toolbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 12;

const minVariantPrice = (food: Food) =>
  food.variants.length ? Math.min(...food.variants.map((v) => Number(v.price))) : Infinity;

const inPriceRange = (food: Food, range: PriceFilter) => {
  if (range === "All") return true;
  const price = minVariantPrice(food);
  if (price === Infinity) return false;
  if (range === "under-300") return price < 300;
  if (range === "300-600") return price >= 300 && price < 600;
  return price >= 600;
};

function FoodGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-4xl border border-border/40 bg-card p-4 shadow-[var(--shadow-card)]"
        >
          <Skeleton className="aspect-4/3 w-full rounded-2xl" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-2/3 rounded-full" />
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FoodsWorkspace() {
  const {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    currentPage,
    setCurrentPage,
    foodType,
    spiceLevel,
    dietType,
    priceRange,
    resetFilters,
  } = useFoods();

  const searchParams = useSearchParams();

  const { data: categoriesData } = useFoodCategories();
  const categories = useMemo(() => categoriesData ?? [], [categoriesData]);

  // Sync search + category from the URL (navbar search / popular category links).
  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
    const catSlug = searchParams.get("category");
    if (catSlug) {
      const match = categories.find((c) => c.slug === catSlug);
      if (match) {
        setActiveCategory(match.name);
        setActiveSubCategory("All");
        setCurrentPage(1);
      }
    }
  }, [
    searchParams,
    categories,
    setSearchQuery,
    setActiveCategory,
    setActiveSubCategory,
    setCurrentPage,
  ]);

  // Fetch all active foods once, then filter/sort/paginate client-side.
  const { data, isLoading } = useGetFoods();
  const allFoods = useMemo(() => data?.items ?? [], [data]);

  // Keep the search input responsive while the (heavier) filter pass runs.
  const deferredSearch = useDeferredValue(searchQuery);

  const filteredFoods = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();

    const result = allFoods.filter((food: Food) => {
      if (activeCategory !== "All" && food.category?.name !== activeCategory) return false;
      if (activeSubCategory !== "All" && food.subCategory?.name !== activeSubCategory) return false;
      if (foodType !== "All" && food.foodType !== foodType) return false;
      if (spiceLevel !== "All" && food.spiceLevel !== spiceLevel) return false;
      if (dietType !== "All" && !food.diets.some((d) => d.dietType === dietType)) return false;
      if (!inPriceRange(food, priceRange)) return false;
      if (term) {
        const hay = `${food.name} ${food.shortDescription ?? ""}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });

    switch (sortBy) {
      case "price-low":
        return [...result].sort((a, b) => minVariantPrice(a) - minVariantPrice(b));
      case "price-high":
        return [...result].sort((a, b) => minVariantPrice(b) - minVariantPrice(a));
      case "rating":
        return [...result].sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
      default:
        return result;
    }
  }, [
    allFoods,
    activeCategory,
    activeSubCategory,
    deferredSearch,
    sortBy,
    foodType,
    spiceLevel,
    dietType,
    priceRange,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredFoods.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filteredFoods.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const pickCategory = (name: string) => {
    setActiveCategory(name);
    setActiveSubCategory("All");
    setCurrentPage(1);
  };

  return (
    <section className="relative bg-muted/30 py-8 lg:py-12">
      <div className="wrapper space-y-6 lg:space-y-8">
        <FoodsToolbar foods={allFoods} totalCount={filteredFoods.length} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Desktop hierarchy sidebar */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)]">
              <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />
              <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
              <h3 className="font-heading text-base font-normal text-foreground">Categories</h3>
              <div className="mt-4 flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => pickCategory("All")}
                  className={`w-full justify-start text-left duration-300 ${
                    activeCategory === "All"
                      ? "border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  All Menu Categories
                </Button>

                {categories.map((cat) => (
                  <Categories
                    key={cat.id}
                    cat={cat}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    setActiveSubCategory={setActiveSubCategory}
                    setCurrentPage={setCurrentPage}
                    activeSubCategory={activeSubCategory}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Foods display hub */}
          <div className="space-y-6 lg:col-span-9 lg:space-y-8">
            <CategoryChips
              categories={categories}
              activeCategory={activeCategory}
              onSelect={pickCategory}
              className="lg:hidden"
            />

            {isLoading && !data ? (
              <FoodGridSkeleton />
            ) : (
              <FoodGrid
                filteredFoods={pageItems}
                onClearFilters={resetFilters}
                hasActiveFilters={
                  activeCategory !== "All" ||
                  activeSubCategory !== "All" ||
                  !!searchQuery ||
                  foodType !== "All" ||
                  spiceLevel !== "All" ||
                  dietType !== "All" ||
                  priceRange !== "All"
                }
              />
            )}

            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
