"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
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
      >
        <ChevronLeft className="size-4" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.92]",
              isActive
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(206,163,89,0.3)]"
                : "border border-border/60 bg-card text-muted-foreground hover:bg-muted hover:border-primary/30",
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted hover:border-primary/30 active:scale-[0.92]",
          currentPage === totalPages && "opacity-40 cursor-not-allowed",
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
