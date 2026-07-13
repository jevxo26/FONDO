"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RiderPerformanceData } from "@/data/riders";
import { DataTableColumnHeader } from "@/components/common/table";
import { RiderStatusBadge } from "./rider-status-badge";

export const riderPerformanceColumns: ColumnDef<RiderPerformanceData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rider" />,
    cell: ({ row }) => (
      <span className="text-sm font-bold text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "deliveriesThisWeek",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deliveries" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.deliveriesThisWeek}</span>
    ),
  },
  {
    accessorKey: "onTimeRate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="On-Time" />,
    cell: ({ row }) => (
      <span className={`font-bold ${row.original.onTimeRate > 90 ? "text-success" : row.original.onTimeRate > 80 ? "text-warning" : "text-destructive"}`}>
        {row.original.onTimeRate}%
      </span>
    ),
  },
  {
    accessorKey: "avgRating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.avgRating}</span>
    ),
  },
  {
    accessorKey: "lateDeliveries",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Late" />,
    cell: ({ row }) => (
      <span className={row.original.lateDeliveries > 3 ? "font-bold text-destructive" : "text-sm text-muted-foreground"}>
        {row.original.lateDeliveries}
      </span>
    ),
  },
  {
    accessorKey: "complaints",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Complaints" />,
    cell: ({ row }) => (
      <span className={row.original.complaints > 0 ? "font-bold text-destructive" : "text-sm text-muted-foreground"}>
        {row.original.complaints}
      </span>
    ),
  },
  {
    accessorKey: "distanceCovered",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Distance" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.distanceCovered}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <RiderStatusBadge status={row.original.status} />,
  },
];
