"use client";

import { DataTable } from "@/components/common/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { foodColumns } from "./food-columns";
import type { AdminFoodItem } from "@/data/foods";
import { Eye } from "lucide-react";
import { useMemo, useState } from "react";
import type { RowAction } from "@/components/common/table";

const rowActions: RowAction<AdminFoodItem>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (food) => console.log("View Details", food.id),
  },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "price-asc", label: "Price Low-High" },
] as const;

const foodTypeOptions = [
  { value: "all", label: "All Types" },
  { value: "VEG", label: "Veg" },
  { value: "NON_VEG", label: "Non-Veg" },
  { value: "VEGAN", label: "Vegan" },
  { value: "SEAFOOD", label: "Seafood" },
] as const;

export function FoodTableSection({ data }: { data: AdminFoodItem[] }) {
  const [sortKey, setSortKey] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(data.map((f) => f.categoryName));
    return ["all", ...Array.from(unique).sort()];
  }, [data]);

  const sortedData = useMemo(() => {
    let filtered = [...data];

    if (categoryFilter !== "all") {
      filtered = filtered.filter((f) => f.categoryName === categoryFilter);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter((f) => f.foodType === typeFilter);
    }

    switch (sortKey) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
    }

    return filtered;
  }, [data, sortKey, categoryFilter, typeFilter]);

  return (
    <DataTable
      columns={foodColumns}
      data={sortedData}
      rowActions={rowActions}
      toolbarActions={
        <div className="flex items-center gap-2">
          <Select value={sortKey} onValueChange={(v) => v && setSortKey(v)}>
            <SelectTrigger className="w-36 border-border text-xs font-bold">
              <SelectValue>{sortOptions.find((o) => o.value === sortKey)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={(v) => v && setCategoryFilter(v)}>
            <SelectTrigger className="w-36 border-border text-xs font-bold">
              <SelectValue>{categoryFilter === "all" ? "All Categories" : categoryFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => v && setTypeFilter(v)}>
            <SelectTrigger className="w-32 border-border text-xs font-bold">
              <SelectValue>{foodTypeOptions.find((o) => o.value === typeFilter)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {foodTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
}
