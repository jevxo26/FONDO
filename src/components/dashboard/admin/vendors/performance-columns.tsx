"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { VendorPerformance } from "@/data/vendors";
import { DataTableColumnHeader } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";

export const performanceColumns: ColumnDef<VendorPerformance>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <div>
        <p className="font-bold text-foreground">{row.original.name}</p>
        <p className="text-[13px] text-muted-foreground">{row.original.kitchen}</p>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.rating.toFixed(1)}</span>
    ),
  },
  {
    accessorKey: "orders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.orders.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "onTimeRate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="On-Time" />,
    cell: ({ row }) => {
      const rate = row.original.onTimeRate;
      return (
        <span
          className={`font-bold ${rate > 90 ? "text-success" : rate > 85 ? "text-warning" : "text-destructive"}`}
        >
          {rate}%
        </span>
      );
    },
  },
  {
    accessorKey: "complaints",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Complaints" />,
    cell: ({ row }) => {
      const c = row.original.complaints;
      return (
        <span className={c > 5 ? "font-bold text-destructive" : "text-sm text-muted-foreground"}>
          {c}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.status === "ACTIVE" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
];
