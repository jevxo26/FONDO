"use client";

import { useEffect } from "react";
import { SlidersHorizontal, ArrowUpDown, RotateCcw, Sparkles } from "lucide-react";
import { usePackages } from "./packages-context";
import PackageGrid from "./package-grid";
import { useGetPackageCategoriesQuery, useGetPackagesQuery } from "@/store/api/slices/packages-api";
import FoodsLoading from "@/app/(main)/foods/loading";

export default function PackagesWorkspace() {
  const { data: categoriesData, isLoading: categoriesLoading } = useGetPackageCategoriesQuery(10);
  const { data: packageResponse, isLoading: packageLoading } = useGetPackagesQuery(undefined);

  const {
    selectedCategoryId,
    setSelectedCategoryId,
    selectedDuration,
    setSelectedDuration,
    maxPrice,
    setMaxPrice,
    maxCalories,
    setMaxCalories,
    isVegetarian,
    setIsVegetarian,
    isHighProtein,
    setIsHighProtein,
    isCustomizable,
    setIsCustomizable,
    sortBy,
    setSortBy,
    processedPackages,
    setRawPackages,
    setCategories,
    categories,
    resetFilters,
  } = usePackages();

  // API ডাটা Context-এ সিঙ্ক করা
  useEffect(() => {
    if (packageResponse) {
      setRawPackages(packageResponse);
    }
  }, [packageResponse, setRawPackages]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData, setCategories]);

  if (packageLoading || categoriesLoading) return <FoodsLoading />;

  return (
    <section className="wrapper py-12">
      {/* Dynamic API Category Scrollbar Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/60 no-scrollbar">
        <button
          onClick={() => setSelectedCategoryId("all")}
          className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            selectedCategoryId === "all"
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card border-border hover:bg-muted text-muted-foreground"
          }`}
        >
          All Plans
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedCategoryId === cat.id
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border hover:bg-muted text-muted-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Updated Sidebar Controls Layout */}
        <aside className="lg:sticky lg:top-6 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 font-heading text-sm font-semibold">
              <SlidersHorizontal className="size-4 text-primary" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-[11px] font-medium text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              <span>Max Budget</span>
              <span className="text-primary font-bold text-xs">৳{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-muted accent-primary rounded-lg cursor-pointer appearance-none"
            />
            <div className="flex justify-between text-[9px] text-muted-foreground font-semibold">
              <span>৳1,000</span>
              <span>৳15,000</span>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Plan Duration
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-muted/60 p-1 rounded-xl">
              {[7, 15, 30].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDuration(selectedDuration === d ? null : d)}
                  className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    selectedDuration === d
                      ? "bg-card text-primary shadow-xs border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* Calorie Range */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              <span>Max Daily Calories</span>
              <span className="text-primary font-bold text-xs">{maxCalories} kcal</span>
            </div>
            <input
              type="range"
              min="500"
              max="3500"
              step="100"
              value={maxCalories}
              onChange={(e) => setMaxCalories(Number(e.target.value))}
              className="w-full h-1.5 bg-muted accent-primary rounded-lg cursor-pointer appearance-none"
            />
          </div>

          {/* Boolean Checkboxes */}
          <div className="flex flex-col gap-3 pt-3 border-t border-border/60">
            <label className="flex items-center justify-between text-xs cursor-pointer group">
              <span className="text-foreground group-hover:text-primary transition-colors">Vegetarian Only</span>
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
                className="rounded border-border text-primary size-4 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between text-xs cursor-pointer group">
              <span className="text-foreground group-hover:text-primary transition-colors">High Protein</span>
              <input
                type="checkbox"
                checked={isHighProtein}
                onChange={(e) => setIsHighProtein(e.target.checked)}
                className="rounded border-border text-primary size-4 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between text-xs cursor-pointer group">
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-3 text-amber-500" />
                <span className="text-foreground group-hover:text-primary transition-colors">Customizable</span>
              </div>
              <input
                type="checkbox"
                checked={isCustomizable}
                onChange={(e) => setIsCustomizable(e.target.checked)}
                className="rounded border-border text-primary size-4 accent-primary"
              />
            </label>
          </div>
        </aside>

        {/* Product Cards Workspace */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-card border border-border rounded-xl p-3.5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">
              Showing <strong className="text-foreground">{processedPackages.length}</strong> subscription plans
            </span>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold border-none outline-none cursor-pointer focus:ring-0 text-foreground"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Lowest Price</option>
                <option value="price-desc">Highest Price</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          <PackageGrid />
        </div>
      </div>
    </section>
  );
}