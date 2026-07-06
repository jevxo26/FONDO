"use client";

import { Search } from "lucide-react";

export function SearchForm() {
  return (
    <div className="hidden items-center lg:flex">
      <form className="flex h-[40px] w-[296px] items-center rounded-[16px] border-[0.67px] border-border bg-muted">
        <input
          type="text"
          placeholder="Search for products..."
          className="h-full w-[195px] rounded-l-[16px] bg-transparent px-4 py-[10px] text-[16px] text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="flex h-[40px] w-[100px] items-center justify-center gap-[6px] rounded-r-[16px] bg-primary px-4 py-[10px]"
        >
          <Search className="size-4 text-white" />
          <span className="text-[14px] font-medium text-white">Search</span>
        </button>
      </form>
    </div>
  );
}
