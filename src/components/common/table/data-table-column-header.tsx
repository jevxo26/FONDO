"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
    );
  }

  const isSorted = column.getIsSorted();

  return (
    <button
      onClick={column.getToggleSortingHandler()}
      className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
    >
      {title}
      {isSorted === "asc" ? (
        <ArrowUp className="size-3 text-primary" />
      ) : isSorted === "desc" ? (
        <ArrowDown className="size-3 text-primary" />
      ) : (
        <ArrowUpDown className="size-3 opacity-40" />
      )}
    </button>
  );
}
