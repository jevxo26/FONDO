"use client";

import React, { useMemo } from "react";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import PackageGrid from "./package-grid";
import { usePackages } from "./packages-context";

import {
  useGetPackageCategoriesQuery,
  useGetPackagesQuery,
} from "@/store/api/slices/packages-api";

import FoodsLoading from "@/app/(main)/foods/loading";
import type { Package, PackageCategory } from "@/types/package";

const getPackageStats = (pkg: Package) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let isVeg = true;
  let foodCount = 0;

  if (pkg.days && pkg.days.length > 0) {
    pkg.days.forEach((day) => {
      day.meals?.forEach((meal) => {
        meal.foods?.forEach((item) => {
          const food = item.food;
          const qty = item.quantity || 1;
          if (food) {
            foodCount++;
            totalCalories += (food.calories || 0) * qty;
            totalProtein += (food.protein || 0) * qty;
            
            if (food.foodType !== "VEG") {
              isVeg = false;
            }
          }
        });
      });
    });
  } else {
    isVeg = false;
  }

  const dayCount = pkg.days?.length || pkg.durationDays || 1;
  const avgDailyCalories = Math.round(totalCalories / dayCount);
  const avgDailyProtein = Math.round(totalProtein / dayCount);

  return {
    avgDailyCalories,
    avgDailyProtein,
    isVeg: foodCount > 0 ? isVeg : false,
    isHighProtein: avgDailyProtein >= 45,
  };
};

export default function PackagesWorkspace() {
  const { data: categories = [], isLoading: categoryLoading } =
    useGetPackageCategoriesQuery(undefined);

  const { data: packages = [], isLoading: packageLoading } =
    useGetPackagesQuery(undefined);

  const {
    searchQuery,
    selectedCategory,
    setSelectedCategory,
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
  } = usePackages();

  // --- Filtering & Sorting Logic ---
  const processedPackages = useMemo(() => {
    if (!packages || !Array.isArray(packages)) return [];

    return packages
      .filter((pkg: Package) => {
        const finalPrice = Number(pkg.discountPrice ?? pkg.price ?? 0);
        const stats = getPackageStats(pkg);
        if (
          searchQuery &&
          !pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        if (
          selectedCategory !== "All" &&
          pkg.packageCategoryId !== selectedCategory &&
          pkg.packageCategory?.id !== selectedCategory
        ) {
          return false;
        }
        if (selectedDuration && pkg.durationDays !== selectedDuration) {
          return false;
        }
        if (finalPrice > maxPrice) {
          return false;
        }
        if (isCustomizable && !pkg.isCustomizable) {
          return false;
        }
        if (maxCalories && stats.avgDailyCalories > maxCalories) {
          return false;
        }
        if (isVegetarian && !stats.isVeg) {
          return false;
        }
        if (isHighProtein && !stats.isHighProtein) {
          return false;
        }
        return true;
      })
      .sort((a: Package, b: Package) => {
        const aPrice = Number(a.discountPrice ?? a.price ?? 0);
        const bPrice = Number(b.discountPrice ?? b.price ?? 0);
        const aRating = Number(a.rating?.averageRating ?? a.rating?.averageRating ?? 0);
        const bRating = Number(b.rating?.averageRating ?? b.rating?.averageRating ?? 0);

        switch (sortBy) {
          case "price-asc":
            return aPrice - bPrice;

          case "price-desc":
            return bPrice - aPrice;

          case "rating":
            return bRating - aRating;

          case "popular":
          default:
            return 0;
        }
      });
  }, [
    packages,
    searchQuery,
    selectedCategory,
    selectedDuration,
    maxPrice,
    maxCalories,
    isVegetarian,
    isHighProtein,
    isCustomizable,
    sortBy,
  ]);

  if (categoryLoading || packageLoading) {
    return <FoodsLoading />;
  }

  return (
    <section className="wrapper py-12">
      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/60">
        <Button
          variant={selectedCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("All")}
        >
          All
        </Button>

        {categories.map((cat: PackageCategory) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="lg:sticky lg:top-6 bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 font-semibold border-b pb-3 text-foreground">
            <SlidersHorizontal className="size-4 text-foreground" />
            Filters
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium">
              <span>Max Budget</span>
              <span className="text-primary font-bold">৳{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
              <span>৳1,000</span>
              <span>৳15,000</span>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {[7, 15, 30].map((day) => (
                <Button
                  key={day}
                  variant={selectedDuration === day ? "default" : "ghost"}
                  size="sm"
                  type="button"
                  onClick={() =>
                    setSelectedDuration(selectedDuration === day ? null : day)
                  }
                >
                  {day} Days
                </Button>
              ))}
            </div>
          </div>

          {/* Daily Calories Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium">
              <span>Max Daily Calories</span>
              <span className="text-foreground font-bold">{maxCalories} kcal</span>
            </div>
            <input
              type="range"
              min={600}
              max={3000}
              step={100}
              value={maxCalories}
              onChange={(e) => setMaxCalories(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
              <span>600 kcal</span>
              <span>3000 kcal</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-2 border-t border-border">
            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span>Vegetarian Packages</span>
            </label>

            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isHighProtein}
                onChange={(e) => setIsHighProtein(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span>High Protein (45g+/day)</span>
            </label>

            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCustomizable}
                onChange={(e) => setIsCustomizable(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span>Customizable Only</span>
            </label>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-card border rounded-xl p-3 shadow-sm">
            <span className="text-xs font-medium text-muted-foreground">
              Showing <strong className="text-foreground">{processedPackages.length}</strong> plans
            </span>

            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="size-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium border-none focus:ring-0 text-foreground cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Lowest Price</option>
                <option value="price-desc">Highest Price</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>

          <PackageGrid packages={processedPackages} />
        </div>
      </div>
    </section>
  );
}