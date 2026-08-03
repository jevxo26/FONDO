"use client";

import { useEffect, useMemo } from "react";
import { useFoods } from "./foods-provider";
import { useFoodCategories, useGetFoods } from "@/store/api/slices/foods-api";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";
import type { Food } from "@/types/food";
import Categories from "./categories";
import { FoodsFilterBar } from "./foods-filter-bar";
import { useDebounce } from "@/hooks/use-debounce";

const ITEMS_PER_PAGE = 12;

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
  } = useFoods();

  const { data: categoriesData } = useFoodCategories();
  const categories = useMemo(() => categoriesData ?? [], [categoriesData]);

  const activeCategoryId = useMemo(
    () => categories.find((c) => c.name === activeCategory)?.id,
    [categories, activeCategory],
  );
  const activeCategoryObj = categories.find((c) => c.id === activeCategoryId);
  const activeSubCategoryId = useMemo(
    () => activeCategoryObj?.subCategories.find((s) => s.name === activeSubCategory)?.id,
    [activeCategoryObj, activeSubCategory],
  );

  const debouncedSearch = useDebounce(searchQuery, 400);

  const sortParams = useMemo(() => {
    switch (sortBy) {
      case "price-low":
        return { sortBy: "price", sortOrder: "asc" as const };
      case "price-high":
        return { sortBy: "price", sortOrder: "desc" as const };
      case "rating":
        return { sortBy: "rating", sortOrder: "desc" as const };
      default:
        return {};
    }
  }, [sortBy]);

  const { data, isLoading } = useGetFoods({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    categoryId: activeCategoryId,
    subCategoryId: activeSubCategoryId,
    search: debouncedSearch || undefined,
    ...sortParams,
  });

  const foods: Food[] = data?.items ?? [];
  const totalCount = data?.meta?.totalItems ?? data?.items?.length ?? 0;
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, searchQuery, sortBy, setCurrentPage]);

  const handleClearFilters = () => {
    setActiveCategory("All");
    setActiveSubCategory("All");
    setCurrentPage(1);
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Hierarchy Filter Layout */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border-border rounded-2xl p-5 shadow-sm space-y-4">
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
          <FoodsFilterBar
            totalCount={totalCount}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onPageReset={() => setCurrentPage(1)}
          />
          {/* Main Dynamic Loop */}
          {isLoading && !data ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--shadow-card)]"
                >
                  <div className="aspect-4/3 w-full bg-muted" />
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
              filteredFoods={foods}
              onClearFilters={handleClearFilters}
              hasActiveFilters={
                activeCategory !== "All" || activeSubCategory !== "All" || !!searchQuery
              }
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
