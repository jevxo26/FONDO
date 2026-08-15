"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Pagination as PaginationNav,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

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
    <PaginationNav className="py-8" aria-label="Dish pages">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            className="rounded-full border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </PaginationItem>

        {pages.map((page) =>
          typeof page === "number" ? (
            <PaginationItem key={page}>
              <Button
                variant={page === currentPage ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  "size-10 rounded-full text-xs font-semibold",
                  page === currentPage
                    ? "shadow-[var(--shadow-badge)]"
                    : "border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted",
                )}
              >
                {page}
              </Button>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <span className="flex size-10 items-center justify-center text-xs text-muted-foreground/50">
                &hellip;
              </span>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            className="rounded-full border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  );
}
