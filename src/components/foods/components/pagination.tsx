"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="wrapper flex items-center justify-center gap-2 pt-10 pb-4">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground hover:bg-muted"
      >
        <ChevronLeft className="size-4" />
      </button>

      {[1, 2, 3, 4, 5].map((num) => {
        const isActive = page === num;
        return (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`flex size-10 items-center justify-center rounded-xl font-sans text-sm font-medium border transition-colors
              ${
                isActive
                  ? "bg-[#CEA359] border-[#CEA359] text-[#1B0E08]"
                  : "bg-white border-border text-foreground hover:bg-muted"
              }`}
          >
            {num}
          </button>
        );
      })}

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground hover:bg-muted"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
