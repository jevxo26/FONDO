"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { closeSearch, toggleSearch } from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useFoodCategories } from "@/store/api/slices/foods-api";
import { Skeleton } from "@/components/ui/skeleton";
import { navIcon, navIconPill } from "./pill-styles";
import Link from "next/link";

export function SearchForm() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSearchOpen);
  const { data: popularCategories, isLoading } = useFoodCategories({
    popular: true,
    limit: 4,
  });

  return (
    <>
      {/* Inline search bar — xl+ only */}
      <div className="hidden xl:flex">
        <form className="flex h-11 w-[260px] items-center gap-1 rounded-full border border-border/70 bg-secondary/50 py-1 pl-4 pr-1 shadow-[var(--shadow-card)] transition-all duration-300 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[var(--shadow-elevated)] xl:w-[300px] 2xl:w-[320px]">
          <Search className="size-4 shrink-0 text-primary/70" />
          <Input
            type="text"
            placeholder="Search for products..."
            size="sm"
            className="h-full flex-1 rounded-full border-0 bg-transparent px-2 text-base shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            variant="default"
            className="h-9 gap-1.5 rounded-full px-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(206,163,89,0.35)]"
          >
            <Search className="size-4" />
            Search
          </Button>
        </form>
      </div>

      {/* Search icon — below 2xl */}
      <button
        onClick={() => dispatch(toggleSearch())}
        className={cn(
          navIconPill,
          "xl:hidden",
          isOpen
            ? "bg-none bg-foreground text-background border-primary/40"
            : "text-gold-strong",
        )}
        aria-label="Toggle search"
      >
        {isOpen ? <X className={cn(navIcon)} /> : <Search className={cn(navIcon)} />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-primary/10 bg-background/95 px-4 py-4 backdrop-blur-xl shadow-[0_24px_50px_-20px_rgba(30,26,22,0.25)] xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <form className="flex h-11 w-full items-center gap-1 rounded-full border border-border/70 bg-secondary/50 py-1 pl-4 pr-1 shadow-[var(--shadow-card)] transition-all duration-300 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
            <Search className="size-4 shrink-0 text-primary/70" />
            <Input
              type="text"
              placeholder="Search for products..."
              size="sm"
              className="h-full flex-1 rounded-full border-0 bg-transparent px-2 text-base shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              variant="default"
              aria-label="Search"
              className="h-9 rounded-full px-4 text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(206,163,89,0.35)]"
            >
              <Search className="size-4" />
            </Button>
          </form>

          {(isLoading || (popularCategories && popularCategories.length > 0)) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-16 rounded-full" />
                ))
              ) : (
                (popularCategories ?? []).map((category) => (
                  <Link
                    key={category.id}
                    href={`/foods?category=${category.slug}`}
                    onClick={() => dispatch(closeSearch())}
                    className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    {category.name}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
