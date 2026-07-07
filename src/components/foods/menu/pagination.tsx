"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav 
      className="flex items-center justify-center gap-2 py-12 border-t border-border/40 bg-background"
      aria-label="Pagination Navigation"
    >
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={cn(
          "flex size-10 items-center justify-center rounded-xl border border-border bg-white text-foreground transition-all duration-200 select-none",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed dark:bg-card"
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex size-10 items-center justify-center rounded-xl font-sans text-sm font-medium transition-all duration-200 select-none border",
              isActive
                ? "bg-[#16100C] border-[#16100C] text-white dark:bg-foreground dark:border-foreground dark:text-background"
                : "bg-white border-border text-foreground hover:bg-muted dark:bg-card"
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={cn(
          "flex size-10 items-center justify-center rounded-xl border border-border bg-white text-foreground transition-all duration-200 select-none",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed dark:bg-card"
        )}
        aria-label="Go to next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}