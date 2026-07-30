"use client";

import { useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

import { usePackages } from "./packages-context";
import PackageGrid from "./package-grid";

import {
  useGetPackageCategoriesQuery,
  useGetPackagesQuery,
} from "@/store/api/slices/packages-api";

import FoodsLoading from "@/app/(main)/foods/loading";

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

  const processedPackages = useMemo(() => {
    if (!packages) return [];

    return [...packages]
      .filter((pkg) => {
        const price = Number(pkg.discountPrice ?? pkg.price);

        if (
          searchQuery &&
          !pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        if (
          selectedCategory !== "All" &&
          pkg.packageCategoryId !== selectedCategory
        ) {
          return false;
        }

        if (
          selectedDuration &&
          pkg.durationDays !== selectedDuration
        ) {
          return false;
        }

        if (price > maxPrice) {
          return false;
        }

        if (isCustomizable && !pkg.isCustomizable) {
          return false;
        }

        // যখন backend calories দিবে তখন ব্যবহার করবে
        if (
          maxCalories &&
          pkg.calories &&
          pkg.calories > maxCalories
        ) {
          return false;
        }

        // backend এ foodType আসলে ব্যবহার করবে
        if (isVegetarian) {
          return true;
        }

        if (isHighProtein) {
          return true;
        }

        return true;
      })
      .sort((a, b) => {
        const aPrice = Number(a.discountPrice ?? a.price);
        const bPrice = Number(b.discountPrice ?? b.price);

        switch (sortBy) {
          case "price-asc":
            return aPrice - bPrice;

          case "price-desc":
            return bPrice - aPrice;

          case "rating":
            return (b.rating ?? 0) - (a.rating ?? 0);

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
      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/60">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap border ${
            selectedCategory === "All"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap border ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="lg:sticky lg:top-6 bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 font-semibold border-b pb-3">
            <SlidersHorizontal className="size-4 text-primary" />
            Filters
          </div>

          {/* Price */}
          <div>
            <label className="text-xs">
              Max Budget (৳{maxPrice})
            </label>

            <input
              type="range"
              min={2000}
              max={12000}
              step={500}
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs">Duration</label>

            <div className="grid grid-cols-3 gap-2 mt-2">
              {[7, 15, 30].map((day) => (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDuration(
                      selectedDuration === day ? null : day
                    )
                  }
                  className={`rounded-lg py-2 ${
                    selectedDuration === day
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {day} Days
                </button>
              ))}
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className="text-xs">
              Calories ({maxCalories})
            </label>

            <input
              type="range"
              min={600}
              max={3000}
              step={100}
              value={maxCalories}
              onChange={(e) =>
                setMaxCalories(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Options */}
          <label>
            <input
              type="checkbox"
              checked={isVegetarian}
              onChange={(e) =>
                setIsVegetarian(e.target.checked)
              }
            />
            Vegetarian
          </label>

          <label>
            <input
              type="checkbox"
              checked={isHighProtein}
              onChange={(e) =>
                setIsHighProtein(e.target.checked)
              }
            />
            High Protein
          </label>

          <label>
            <input
              type="checkbox"
              checked={isCustomizable}
              onChange={(e) =>
                setIsCustomizable(e.target.checked)
              }
            />
            Customizable
          </label>
        </aside>

        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-card border rounded-xl p-3">
            <span>
              Showing {processedPackages.length} plans
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} />

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="popular">Popular</option>
                <option value="price-asc">
                  Lowest Price
                </option>
                <option value="price-desc">
                  Highest Price
                </option>
                <option value="rating">
                  Best Rating
                </option>
              </select>
            </div>
          </div>

          <PackageGrid packages={processedPackages} />
        </div>
      </div>
    </section>
  );
}