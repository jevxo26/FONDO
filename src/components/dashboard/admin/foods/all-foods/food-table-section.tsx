"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { adminFoods, type AdminFoodItem } from "@/data/foods";
import { Archive, Beef, Eye, Flame, ListChecks, Store } from "lucide-react";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ListChecks className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
    { label: "Archived", value: "ARCHIVED" },
  ],
};

const foodTypeFilter: FacetedFilter = {
  columnId: "foodType",
  title: "Type",
  icon: <Beef className="size-4" />,
  options: [
    { label: "Veg", value: "VEG" },
    { label: "Non-Veg", value: "NON_VEG" },
    { label: "Vegan", value: "VEGAN" },
    { label: "Seafood", value: "SEAFOOD" },
  ],
};

const vendorFilter: FacetedFilter = {
  columnId: "vendor",
  title: "Vendor",
  icon: <Store className="size-4" />,
  options: [
    { label: "Fresh Meals", value: "Fresh Meals" },
    { label: "Spice House", value: "Spice House" },
    { label: "Bistro Dhaka", value: "Bistro Dhaka" },
    { label: "Golden Wok", value: "Golden Wok" },
    { label: "Pizza Nova", value: "Pizza Nova" },
    { label: "Curry Leaf", value: "Curry Leaf" },
    { label: "Sweet Tooth", value: "Sweet Tooth" },
    { label: "The Kebab House", value: "The Kebab House" },
  ],
};

const spiceFilter: FacetedFilter = {
  columnId: "spiceLevel",
  title: "Spice",
  icon: <Flame className="size-4" />,
  options: [
    { label: "Mild", value: "MILD" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Hot", value: "HOT" },
    { label: "Extra Hot", value: "EXTRA_HOT" },
  ],
};

export function FoodTableSection() {
  const router = useRouter();

  const rowActions: RowAction<AdminFoodItem>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (food) => router.push(`/dashboard/admin/foods/${food.id}`),
    },
    {
      label: "Archive",
      icon: <Archive className="size-4" />,
      variant: "destructive",
      onClick: (food) => console.log("Archive", food.id),
    },
  ];

  return (
    <DataTable
      data={adminFoods}
      columns={foodColumns}
      rowActions={rowActions}
      filters={[statusFilter, vendorFilter, foodTypeFilter, spiceFilter]}
    />
  );
}
