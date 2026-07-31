"use client";

import { Search, Star } from "lucide-react";
import { useFoods } from "./foods-provider";
import { useFoodCategories, useGetFoods } from "@/store/api/slices/foods-api";

export default function FoodsHero() {
  const { searchQuery, setSearchQuery } = useFoods();
  const { data: categoriesData } = useFoodCategories();
  const { data } = useGetFoods();

  const categoryCount = categoriesData?.items?.length ?? 0;
  const foodCount = data?.items?.length ?? 0;

  return (
    <section className="relative overflow-hidden pt-24 pb-12 border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[400px] rounded-full bg-gradient-to-br from-primary/8 via-primary/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-[350px] rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5">
          <div className="size-1.5 rotate-45 bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            Discover Our Menu
          </span>
        </div>

        <h1 className="font-heading text-4xl md:text-[56px] leading-[1.08] tracking-[-0.03em] text-foreground">
          Explore Our
          <br />
          <span className="text-gold-gradient">Authentic Menu</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Taste the rich legacy of perfectly prepared dishes, premium hand-cut ingredients, and
          traditional sweets crafted daily with absolute care.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Fish Curry, Rosogolla)..."
              className="w-full bg-card border border-border/60 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 shadow-[var(--shadow-card)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{foodCount}</span>
            <span>dishes</span>
          </div>
          <div className="size-1 rotate-45 bg-primary/30" />
          <span>
            <span className="font-semibold text-foreground">{categoryCount}</span>
            <span className="ml-1">categories</span>
          </span>
          <div className="size-1 rotate-45 bg-primary/30" />
          <span>Free delivery over ৳999</span>
        </div>
      </div>
    </section>
  );
}
