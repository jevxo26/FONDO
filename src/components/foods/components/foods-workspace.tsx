"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFoods } from "./foods-provider";
import { useFoodCategories } from "@/hooks/use-food-categories";
import { useGetFoods } from "@/hooks/use-foods";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";
import { Food } from "@/types/food";
import { FoodCategory } from "@/types/category";
import Categories from "./categories";
import { FoodsFilterBar } from "./foods-filter-bar";

const ITEMS_PER_PAGE = 4;

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
  const { data } = useGetFoods();

  const categories: FoodCategory[] = categoriesData?.items ?? [];
  const foods: Food[] = data?.items ?? [];

  const filteredFoods = useMemo(() => {
    let result = [...foods];

    // Search
    if (searchQuery.trim()) {
      const keyword = searchQuery.toLowerCase();

      result = result.filter((food) => {
        return (
          food.name.toLowerCase().includes(keyword) ||
          food.shortDescription.toLowerCase().includes(keyword)
        );
      });
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter(
        (food) => food.category.name === activeCategory
      );
    }

    // SubCategory
    if (activeSubCategory !== "All") {
      const keyword = activeSubCategory.toLowerCase();

      result = result.filter((food) => {
        return (
          food.name.toLowerCase().includes(keyword) ||
          food.shortDescription.toLowerCase().includes(keyword)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.variants[0].price) - Number(b.variants[0].price);

        case "price-high":
          return Number(b.variants[0].price) - Number(a.variants[0].price);

        case "rating":
          return b.rating.averageRating - a.rating.averageRating;

        default:
          return 0;
      }
    });

    return result;
  }, [
    foods,
    activeCategory,
    activeSubCategory,
    searchQuery,
    sortBy,
  ]);

  // Reset to page 1 when filters change
  const filterKey = `${activeCategory}-${activeSubCategory}-${searchQuery}-${sortBy}`;
  const prevFilterKey = useRef(filterKey);

  useEffect(() => {
    if (prevFilterKey.current !== filterKey) {
      setCurrentPage(1);
      prevFilterKey.current = filterKey;
    }
  }, [filterKey, setCurrentPage]);

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);

  const paginatedFoods = filteredFoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


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
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeCategory === "All" ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                All Menu Categories
              </button>

              {categories.map((cat) => (
               <Categories key={cat.id} cat={cat} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setActiveSubCategory={setActiveSubCategory} setCurrentPage={setCurrentPage} activeSubCategory={activeSubCategory} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Foods Display Hub Grid */}
        <div className="lg:col-span-9 space-y-6">
          <FoodsFilterBar
            totalCount={filteredFoods.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onPageReset={() => setCurrentPage(1)}
          />
          {/* Main Dynamic Loop */}
          <FoodGrid filteredFoods={paginatedFoods } />
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