"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusFilters = ["All", "Active", "Draft", "Archived"];

export function FoodControls() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <Button key={s} variant={s === "All" ? "default" : "outline"} size="sm">
            {s}
          </Button>
        ))}
      </div>
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
      </Select>
      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Food Type" />
        </SelectTrigger>
      </Select>
    </div>
  );
}
