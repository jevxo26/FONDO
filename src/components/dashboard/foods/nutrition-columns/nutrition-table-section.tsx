"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { nutritionColumns } from "./nutrition-columns";
import { nutritionItems, type NutritionItem } from "@/data/nutrition";
import { Eye, Edit, Tag, Zap } from "lucide-react";

const rowActions: RowAction<NutritionItem>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (item) => console.log("View Details", item.id),
  },
  {
    label: "Edit Nutrition",
    icon: <Edit className="size-4" />,
    onClick: (item) => console.log("Edit", item.id),
  },
];

const calorieFilter: FacetedFilter = {
  columnId: "calorieLevel",
  title: "Calories",
  icon: <Zap className="size-4" />,
  options: [
    { label: "Low (<300)", value: "LOW" },
    { label: "Medium (300-500)", value: "MEDIUM" },
    { label: "High (>500)", value: "HIGH" },
  ],
};

const discountFilter: FacetedFilter = {
  columnId: "discountStatus",
  title: "Discount",
  icon: <Tag className="size-4" />,
  options: [
    { label: "On Sale", value: "ON_SALE" },
    { label: "Full Price", value: "FULL_PRICE" },
  ],
};

export function NutritionTableSection() {
  return (
    <DataTable
      data={nutritionItems}
      columns={nutritionColumns}
      rowActions={rowActions}
      filters={[calorieFilter, discountFilter]}
    />
  );
}
