"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminFoods } from "@/data/foods";

const statusFilters = ["All", "Active", "Draft", "Archived"];
export function FoodControls() {
  const totalCount = adminFoods.length;
  const activeCount = adminFoods.filter((f) => f.status === "ACTIVE").length;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-1 flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4">
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

      <div className="flex flex-col justify-center rounded-xl bg-primary p-4 text-primary-foreground lg:w-[240px]">
        <p className="text-xs opacity-90">TOTAL FOOD ITEMS</p>
        <h3 className="font-fraunces text-2xl font-bold">{totalCount}</h3>
        <p className="text-xs opacity-80">{activeCount} Active</p>
      </div>
    </div>
  );
}