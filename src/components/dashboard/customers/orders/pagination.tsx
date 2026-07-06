"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
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
        of{" "}
        <span className="font-bold text-foreground">{totalItems}</span> orders
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
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
              onClick={() => onPageChange(p)}
              className={cn(
                "flex size-8 items-center justify-center rounded text-sm font-bold transition-colors",
                p === currentPage
                  ? "bg-foreground text-white"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex size-8 items-center justify-center rounded border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
        >
          <ChevronRight className="size-[18px]" />
        </button>
      </div>
    </div>
  );
}
