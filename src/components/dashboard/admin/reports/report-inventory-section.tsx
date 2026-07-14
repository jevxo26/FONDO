"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { inventoryReportColumns } from "./report-inventory-columns";
import type { InventoryReportEntry } from "@/data/reports";
import { CheckCircle, Eye, Package, RefreshCw } from "lucide-react";

const rowActions: RowAction<InventoryReportEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Inventory Item", row.id),
  },
  {
    label: "Restock",
    icon: <RefreshCw className="size-4" />,
    onClick: (row) => console.log("Restock Item", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "In Stock", value: "IN_STOCK" },
    { label: "Low Stock", value: "LOW_STOCK" },
    { label: "Out of Stock", value: "OUT_OF_STOCK" },
    { label: "Overstocked", value: "OVERSTOCKED" },
  ],
};

const categoryFilter: FacetedFilter = {
  columnId: "category",
  title: "Category",
  icon: <Package className="size-4" />,
  options: [
    { label: "Grains", value: "Grains" },
    { label: "Meat", value: "Meat" },
    { label: "Vegetables", value: "Vegetables" },
    { label: "Spices", value: "Spices" },
    { label: "Dairy", value: "Dairy" },
    { label: "Oils", value: "Oils" },
    { label: "Condiments", value: "Condiments" },
  ],
};

export function ReportInventorySection({ data }: { data: InventoryReportEntry[] }) {
  return (
    <DataTable
      columns={inventoryReportColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter, categoryFilter]}
    />
  );
}
