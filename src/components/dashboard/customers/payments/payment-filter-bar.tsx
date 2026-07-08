"use client";

import { Calendar } from "lucide-react";

const statusFilters = [
  "All Transactions",
  "Success",
  "Refunded",
  "Failed",
] as const;

interface PaymentFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function PaymentFilterBar({
  activeFilter,
  onFilterChange,
}: PaymentFilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-5 py-2 text-[11px] font-bold transition-all ${
              activeFilter === filter
                ? "bg-foreground text-white"
                : "border border-border bg-card text-muted-foreground hover:border-primary hover:bg-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Date Range:</span>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-muted">
          <span>Oct 1 - Oct 15, 2023</span>
          <Calendar className="size-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
