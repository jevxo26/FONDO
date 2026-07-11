"use client";

import { DataTable } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { adminFoods, type AdminFoodItem } from "@/data/foods";
import { Eye } from "lucide-react";
import type { RowAction } from "@/components/common/table";

const rowActions: RowAction<AdminFoodItem>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (food) => console.log("View Details", food.id),
  },
];

export function FoodTableSection() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <DataTable data={adminFoods} columns={foodColumns} rowActions={rowActions} />
    </div>
  );
}
