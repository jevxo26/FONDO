"use client";
import { useFoodCategories } from "@/hooks/useFoodCategories";
import { Search } from "lucide-react";
import { useFoods } from "./foods-provider";

export default function FoodsHero() {
  const { searchQuery, setSearchQuery } = useFoods();
  const { data: CategoriesData = [], isLoading } = useFoodCategories();
  if (isLoading) return <h2>Data loading</h2>;

  const categories = CategoriesData.items;
  console.log("this is categories data", CategoriesData);
  console.log("this is categories", categories);
  return (
    <section className="bg-[#FAF5EB] pt-24 pb-12 border-b border-[#16100C]/5">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#CEA359]">
          Culinary Masterpieces
        </span>
        <h1 className="font-fraunces text-4xl md:text-6xl font-normal text-[#16100C] leading-tight">
          Explore Our Authentic Menu
        </h1>
        <p className="font-sans text-sm md:text-base text-[#16100C]/70 max-w-xl mx-auto leading-relaxed font-light">
          Taste the rich legacy of perfectly scaled macros, premium hand-cut seafood, and
          traditional sweets crafted daily under absolute clinical compliance.
        </p>

        {/* Search Matrix Layer */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#16100C]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Fish Curry, Rosogolla)..."
              className="w-full bg-white border border-[#16100C]/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-[#16100C] focus:outline-none focus:ring-1 focus:ring-[#CEA359] shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
