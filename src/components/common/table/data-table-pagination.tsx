"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalItems);

  const pages: (number | "...")[] = [];
  for (let i = 0; i < totalPages; i++) {
    if (
      i === 0 ||
      i === totalPages - 1 ||
      (i >= pageIndex - 1 && i <= pageIndex + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-border bg-secondary px-6 py-4">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-bold text-foreground">
          {start}-{end}
        </span>{" "}
        of <span className="font-bold text-foreground">{totalItems}</span>{" "}
        entries
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex size-8 items-center justify-center rounded border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
        >
          <ChevronLeft className="size-[18px]" />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex size-8 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => table.setPageIndex(p)}
              className={cn(
                "flex size-8 items-center justify-center rounded text-sm font-bold transition-colors",
                p === pageIndex
                  ? "bg-foreground text-white"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              {p + 1}
            </button>
          ),
        )}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex size-8 items-center justify-center rounded border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
        >
          <ChevronRight className="size-[18px]" />
        </button>
      </div>
    </div>
  );
}
