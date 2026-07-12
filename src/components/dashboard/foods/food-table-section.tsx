"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { adminFoods, type AdminFoodItem } from "@/data/foods";
import { Archive, Eye } from "lucide-react";

const rowActions: RowAction<AdminFoodItem>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (food) => console.log("View Details", food.id),
  },
  {
    label: "Archive",
    icon: <Archive className="size-4" />,
    variant: "destructive",
    onClick: (food) => console.log("Archive", food.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
    { label: "Archived", value: "ARCHIVED" },
  ],
};

const foodTypeFilter: FacetedFilter = {
  columnId: "foodType",
  title: "Type",
  options: [
    { label: "Veg", value: "VEG" },
    { label: "Non-Veg", value: "NON_VEG" },
    { label: "Vegan", value: "VEGAN" },
    { label: "Seafood", value: "SEAFOOD" },
  ],
};

const spiceFilter: FacetedFilter = {
  columnId: "spiceLevel",
  title: "Spice",
  options: [
    { label: "Mild", value: "MILD" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Hot", value: "HOT" },
    { label: "Extra Hot", value: "EXTRA_HOT" },
  ],
};

export function FoodTableSection() {
  return (
    <DataTable
      data={adminFoods}
      columns={foodColumns}
      rowActions={rowActions}
      filters={[statusFilter, foodTypeFilter, spiceFilter]}
    />
  );
}
