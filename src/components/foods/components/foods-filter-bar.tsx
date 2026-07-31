"use client";

import { ChevronDown } from "lucide-react";

interface Props {
  totalCount: number;
  sortBy: string;
  onSortChange: (val: string) => void;
  onPageReset: () => void;
}

export function FoodsFilterBar({ totalCount, sortBy, onSortChange, onPageReset }: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-card px-5 py-3 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-2.5">
        <div className="size-1 rotate-45 bg-primary/50" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Showing {totalCount} dishes
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:block text-[10px] text-muted-foreground/70 uppercase tracking-wider">
          Sort
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => {
              onSortChange(e.target.value);
              onPageReset();
            }}
            className="appearance-none bg-transparent pr-6 pl-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/60" />
        </div>
      </div>
    </div>
  );
}
