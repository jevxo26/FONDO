"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="wrapper flex items-center justify-center gap-2 py-10">
      {/* Previous */}
      <Link
        href={createPageLink(Math.max(currentPage - 1, 1))}
        aria-disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-muted"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={createPageLink(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
            page === currentPage
              ? "border-[#CEA359] bg-[#CEA359] text-[#1B0E08]"
              : "border-border bg-background hover:bg-muted"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      <Link
        href={createPageLink(Math.min(currentPage + 1, totalPages))}
        aria-disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-muted"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}