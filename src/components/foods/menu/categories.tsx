"use client";

import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "kacchi", label: "Kacchi" },
  { id: "tehari", label: "Tehari" },
  { id: "roast", label: "Roast" },
  { id: "kebab", label: "Kebab" },
  { id: "borhani", label: "Borhani" },
  { id: "dessert", label: "Dessert" },
  { id: "drinks", label: "Drinks" },
] as const;

interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
  return (
    <section className="w-full border-y border-border/60 bg-secondary/30 py-5">
      <div className="wrapper">
        {/* Horizontal scroll wrapper for mobile, normal flex wrapping on desktop */}
        <div className="scrollbar-none flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 md:flex-wrap">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-full px-6 font-sans text-sm font-medium transition-all duration-200 select-none border whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-[#16100C] border-[#16100C] text-white dark:bg-foreground dark:border-foreground dark:text-background"
                    : "bg-white border-border text-foreground hover:bg-muted/60 dark:bg-card"
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}