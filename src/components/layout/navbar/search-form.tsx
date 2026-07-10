"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  return (
    <div className="hidden items-center lg:flex">
      <form className="flex h-10 w-[296px] items-center rounded-2xl border border-border bg-muted">
        <Input
          type="text"
          placeholder="Search for products..."
          size="sm"
          className="h-full w-[195px] rounded-l-2xl border-0 bg-transparent px-4 text-base shadow-none"
        />
        <Button
          type="submit"
          variant="default"
          className="h-10 w-[100px] gap-1.5 rounded-r-2xl rounded-l-none px-4 text-sm font-medium text-white"
        >
          <Search className="size-4" />
          Search
        </Button>
      </form>
    </div>
  );
}
