"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 py-8">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-10 w-10 rounded-xl border disabled:opacity-40"
      >
        <ChevronLeft className="mx-auto h-4 w-4" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-xl border ${
              page === currentPage
                ? "bg-[#CEA359] text-white border-[#CEA359]"
                : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-10 w-10 rounded-xl border disabled:opacity-40"
      >
        <ChevronRight className="mx-auto h-4 w-4" />
      </button>

    </div>
  );
}