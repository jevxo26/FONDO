"use client";

import { useMemo } from "react";
import { useFoods } from "./foods-provider";
import { useFoodCategories } from "@/hooks/useFoodCategories";
import { useGetFoods } from "@/hooks/use-foods";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";
import { Food } from "@/types/food";
import { FoodCategory } from "@/types/category";
import Categories from "./categories";

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
  const { data, isLoading } = useGetFoods();

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

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);

  const paginatedFoods = filteredFoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-12 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Hierarchy Filter Layout */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-[#16100C]/10 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-fraunces text-base font-normal text-[#16100C]">Categories</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveCategory("All")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeCategory === "All" ? "bg-[#CEA359]/10 text-[#CEA359] font-bold" : "text-[#16100C]/70 hover:bg-[#16100C]/5"
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
          {/* Controls Bar */}
          <div className="flex justify-between items-center bg-white border border-[#16100C]/5 rounded-2xl px-5 py-3 shadow-sm">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#16100C]/50">
              Showing {filteredFoods.length} culinary items
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#16100C]/60 font-light">Sort By:</span>
              <select
                value={sortBy}
               onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
                className="bg-transparent text-[11px] font-bold uppercase tracking-wider text-[#16100C] border-none focus:outline-none cursor-pointer"
              >
                <option value="default">Default Framework</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated Metrics</option>
              </select>
            </div>
          </div>
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