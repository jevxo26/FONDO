"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InventoryItem } from "@/data/inventory";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  IN_STOCK: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  LOW_STOCK: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  OUT_OF_STOCK: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusLabels: Record<string, string> = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "foodName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Food Item" />,
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.foodName}</span>
    ),
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
  },
  {
    accessorKey: "currentStock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      const stock = row.original.currentStock;
      const unit = row.original.unit;
      return (
        <span className="font-mono text-sm font-medium">
          {stock} {unit}
        </span>
      );
    },
  },
  {
    accessorKey: "minStock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Min. Stock" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.original.minStock} {row.original.unit}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusStyles[status],
          )}
        >
          {statusLabels[status]}
        </span>
      );
    },
  },
  {
    accessorKey: "lastRestocked",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Restocked" />,
  },
];
