"use client";
import { useFoodCategories } from "@/hooks/use-food-categories";
import { Search } from "lucide-react";
import { useFoods } from "./foods-provider";

export default function FoodsHero() {
  const { searchQuery, setSearchQuery } = useFoods();
  return (
    <section className="bg-muted/30 pt-24 pb-12 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary">
          Culinary Masterpieces
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-normal text-foreground leading-tight">
          Explore Our Authentic Menu
        </h1>
        <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
          Taste the rich legacy of perfectly scaled macros, premium hand-cut seafood, and
          traditional sweets crafted daily under absolute clinical compliance.
        </p>

        {/* Search Matrix Layer */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Fish Curry, Rosogolla)..."
              className="w-full bg-background border-border rounded-2xl pl-11 pr-4 py-3.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
