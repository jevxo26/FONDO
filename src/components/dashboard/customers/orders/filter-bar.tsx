"use client";

import { TogglePill } from "@/components/common/toggle-pill";
import { Calendar } from "lucide-react";

const statusFilters = [
  "All Orders",
  "Processing",
  "Out for Delivery",
  "Completed",
  "Cancelled",
] as const;

export function FilterBar() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-6 rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-4 shadow-[var(--shadow-card)] md:p-6">
      <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Order Status
          </span>
        <TogglePill items={statusFilters} value="All Orders" onChange={() => {}} />
      </div>

      <div className="mx-2 hidden h-12 w-px bg-border sm:block" />

      <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Date Range
          </span>
          <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2 ring-1 ring-primary/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/10 hover:ring-primary/20">
          <Calendar className="size-4 text-muted-foreground" />
          <input
            className="w-44 border-none p-0 text-sm focus:ring-0"
            type="text"
            defaultValue="Oct 12, 2023 - Oct 19, 2023"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
