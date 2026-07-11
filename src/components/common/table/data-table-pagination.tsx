"use client";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  start: number;
  end: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  start,
  end,
  totalItems,
  onPageChange,
}: DataTablePaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 border-t border-primary/10 bg-amber-50/80 dark:bg-amber-950/30 px-4 py-4 md:flex-row md:px-6">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-bold text-foreground">
          {start + 1}-{end}
        </span>{" "}
        of <span className="font-bold text-foreground">{totalItems}</span> entries
      </p>
      <div className="flex items-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(0, currentPage - 1))}
              className={currentPage === 0 ? "pointer-events-none opacity-30" : "cursor-pointer"}
            />
          </PaginationItem>
          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === currentPage}
                  onClick={() => onPageChange(p)}
                  className={p === currentPage ? "bg-primary text-primary-foreground border-0 shadow-[0_2px_8px_rgba(206,163,89,0.25)]" : ""}
                >
                  {p + 1}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
              className={
                currentPage === totalPages - 1 ? "pointer-events-none opacity-30" : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </div>
    </div>
  );
}
