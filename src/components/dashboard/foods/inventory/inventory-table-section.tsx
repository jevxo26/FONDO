"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter } from "@/components/common/table";
import { inventoryColumns } from "./inventory-columns";
import { inventoryItems } from "@/data/inventory";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "In Stock", value: "IN_STOCK" },
    { label: "Low Stock", value: "LOW_STOCK" },
    { label: "Out of Stock", value: "OUT_OF_STOCK" },
  ],
};

export function InventoryTableSection() {
  return (
    <DataTable
      data={inventoryItems}
      columns={inventoryColumns}
      filters={[statusFilter]}
    />
  );
}
