"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = useMemo(() => {
    const result: (number | "ellipsis-left" | "ellipsis-right")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
      return result;
    }
    result.push(1);
    if (currentPage > 3) result.push("ellipsis-left");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      result.push(i);
    }
    if (currentPage < totalPages - 2) result.push("ellipsis-right");
    result.push(totalPages);
    return result;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted hover:border-primary/30 active:scale-[0.92]",
          currentPage === 1 && "opacity-40 cursor-not-allowed",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.92]",
              page === currentPage
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(206,163,89,0.3)]"
                : "border border-border/60 bg-card text-muted-foreground hover:bg-muted hover:border-primary/30",
            )}
          >
            {page}
          </button>
        ) : (
          <span key={page} className="flex size-10 items-center justify-center text-xs text-muted-foreground/50">
            &hellip;
          </span>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted hover:border-primary/30 active:scale-[0.92]",
          currentPage === totalPages && "opacity-40 cursor-not-allowed",
        )}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
