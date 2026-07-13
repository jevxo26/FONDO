"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InventoryReportEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "./report-badges";

export const inventoryReportColumns: ColumnDef<InventoryReportEntry>[] = [
  {
    accessorKey: "itemName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item" />,
    cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.original.itemName}</span>,
  },
  {
    accessorKey: "category",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => <span className="text-xs font-semibold uppercase text-muted-foreground">{row.original.category}</span>,
  },
  {
    accessorKey: "currentStock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      const stock = row.original.currentStock;
      const min = row.original.minStock;
      return (
        <span className={`font-bold ${stock === 0 ? "text-destructive" : stock < min ? "text-warning" : "text-foreground"}`}>
          {stock}
        </span>
      );
    },
  },
  {
    accessorKey: "minStock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Min Stock" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.minStock}</span>,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unit" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.unit}</span>,
  },
  {
    accessorKey: "usageRate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Usage/Day" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.usageRate}</span>,
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.status} />,
  },
  {
    accessorKey: "lastRestocked",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Restocked" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastRestocked}</span>,
  },
];
