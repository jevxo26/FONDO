"use client";

import { useEffect, useRef, useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({ table }: DataTableSearchProps<TData>) {
  const [search, setSearch] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      table.setGlobalFilter(search || undefined);
    }, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [search, table]);

  return (
    <div className="relative w-full md:w-auto">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search across all columns..."
        className="w-full rounded-full bg-primary/[0.04] pl-10 ring-1 ring-border/50 focus-visible:ring-primary/30 md:w-72"
      />
    </div>
  );
}
