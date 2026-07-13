"use client";

import { TogglePill } from "@/components/common/toggle-pill";
import { Calendar } from "lucide-react";

const statusFilters = ["All Transactions", "Success", "Refunded", "Failed"] as const;

interface PaymentFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function PaymentFilterBar({ activeFilter, onFilterChange }: PaymentFilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <TogglePill items={statusFilters} value={activeFilter} onChange={onFilterChange} />
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Date Range:</span>
        <button className="flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2 text-sm ring-1 ring-primary/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/10 hover:ring-primary/20">
          <span>Oct 1 - Oct 15, 2023</span>
          <Calendar className="size-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
