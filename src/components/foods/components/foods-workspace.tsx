"use client";

import { useMemo } from "react";
import { useFoods, type PriceFilter } from "./foods-provider";
import { useFoodCategories, useGetFoods } from "@/store/api/slices/foods-api";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";
import type { Food } from "@/types/food";
import Categories from "./categories";
import { FoodFilters } from "./food-filters";
import { FoodsFilterBar } from "./foods-filter-bar";

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

export default function FoodsWorkspace() {
  const {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    searchQuery,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    foodType,
    spiceLevel,
    dietType,
    priceRange,
    resetFilters,
  } = useFoods();

  const { data: categoriesData } = useFoodCategories();
  const categories = useMemo(() => categoriesData ?? [], [categoriesData]);

  // Fetch all active foods once, then filter/sort/paginate client-side.
  const { data, isLoading } = useGetFoods();

  const filteredFoods = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();

    const result = (data?.items ?? []).filter((food: Food) => {
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
    data,
    activeCategory,
    activeSubCategory,
    searchQuery,
    sortBy,
    foodType,
    spiceLevel,
    dietType,
    priceRange,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredFoods.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filteredFoods.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleClearFilters = resetFilters;

  const hasActiveFilters =
    activeCategory !== "All" ||
    activeSubCategory !== "All" ||
    !!searchQuery ||
    foodType !== "All" ||
    spiceLevel !== "All" ||
    dietType !== "All" ||
    priceRange !== "All";

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Hierarchy Filter Layout */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />
            <h3 className="font-heading text-base font-normal text-foreground">Categories</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveCategory("All")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === "All"
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                All Menu Categories
              </button>

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
        </div>

        {/* Right Side Foods Display Hub Grid */}
        <div className="lg:col-span-9 space-y-6">
          <FoodFilters foods={data?.items ?? []} />
          <FoodsFilterBar
            totalCount={filteredFoods.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onPageReset={() => setCurrentPage(1)}
          />
          {/* Main Dynamic Loop */}
          {isLoading && !data ? (
            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-4xl border border-border/40 bg-card p-4 shadow-[var(--shadow-card)]"
                >
                  <div className="aspect-4/3 w-full rounded-2xl bg-muted" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <FoodGrid
              filteredFoods={pageItems}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
