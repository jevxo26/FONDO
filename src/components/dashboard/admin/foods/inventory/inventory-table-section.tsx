"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { inventoryColumns } from "./inventory-columns";
import { inventoryItems, type InventoryItem } from "@/data/inventory";
import { adminFoods } from "@/data/foods";
import { ClipboardCheck, Eye, RefreshCw, Store, Trash2 } from "lucide-react";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ClipboardCheck className="size-4" />,
  options: [
    { label: "In Stock", value: "IN_STOCK" },
    { label: "Low Stock", value: "LOW_STOCK" },
    { label: "Out of Stock", value: "OUT_OF_STOCK" },
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

export function InventoryTableSection() {
  const router = useRouter();

  const rowActions: RowAction<InventoryItem>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (item) => {
        const food = adminFoods.find((f) => f.name === item.foodName);
        if (food) router.push(`/dashboard/foods/${food.id}`);
      },
    },
    {
      label: "Restock",
      icon: <RefreshCw className="size-4" />,
      onClick: (item) => console.log("Restock", item.id),
    },
    {
      label: "Discontinue",
      icon: <Trash2 className="size-4" />,
      variant: "destructive",
      onClick: (item) => console.log("Discontinue", item.id),
    },
  ];

  return (
    <DataTable
      data={inventoryItems}
      columns={inventoryColumns}
      rowActions={rowActions}
      filters={[statusFilter, vendorFilter]}
    />
  );
}
