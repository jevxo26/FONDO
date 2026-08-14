"use client";

import { Star } from "lucide-react";
import { useFoods } from "./foods-provider";
import { useFoodCategories } from "@/store/api/slices/foods-api";
import { cn } from "@/lib/utils";

export default function FoodsHero() {
  const { activeCategory, setActiveCategory, setActiveSubCategory, setCurrentPage } = useFoods();
  const { data: categoriesData } = useFoodCategories();

  const categories = categoriesData ?? [];
  const categoryCount = categories.length;
  const foodCount = categories.reduce((sum, cat) => sum + (cat._count?.foods ?? 0), 0);

  const pickCategory = (name: string) => {
    setActiveCategory(name);
    setActiveSubCategory("All");
    setCurrentPage(1);
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-20 pb-6 lg:pt-24 lg:pb-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[400px] rounded-full bg-gradient-to-br from-primary/8 via-primary/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-[350px] rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-6 size-[7px] rotate-45 border border-primary/30" />
      </div>

      <div className="wrapper">
        <div className="relative mx-auto max-w-3xl animate-fadeIn text-center">
          <div className="space-y-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5">
              <div className="size-1.5 rotate-45 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Discover Our Menu
              </span>
            </div>

            <h1 className="font-heading text-3xl leading-[1.1] tracking-[-0.02em] text-balance text-foreground md:text-[40px]">
              Explore Our <span className="text-primary">Authentic Menu</span>
            </h1>

            <p className="mx-auto max-w-xl font-sans text-sm leading-relaxed text-muted-foreground text-pretty">
              Taste the rich legacy of perfectly prepared dishes, premium hand-cut ingredients, and
              traditional sweets crafted daily with absolute care.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {["All", ...categories.map((c) => c.name)].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => pickCategory(name)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95",
                    activeCategory === name
                      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-badge)]"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 pt-1 text-sm text-muted-foreground">
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
        </div>
      </div>
    </section>
  );
}
