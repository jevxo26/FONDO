"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RiderReportEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "../report-badges";

export const riderReportColumns: ColumnDef<RiderReportEntry>[] = [
  {
    accessorKey: "riderName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rider" />,
    cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.original.riderName}</span>,
  },
  {
    accessorKey: "deliveries",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deliveries" />,
    cell: ({ row }) => <span className="font-bold text-foreground">{row.original.deliveries}</span>,
  },
  {
    accessorKey: "onTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="On-Time" />,
    cell: ({ row }) => <span className="font-bold text-success">{row.original.onTime}</span>,
  },
  {
    accessorKey: "late",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Late" />,
    cell: ({ row }) => (
      <span className={row.original.late > 0 ? "font-bold text-destructive" : "text-sm text-muted-foreground"}>
        {row.original.late}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <span className={`font-bold ${row.original.rating >= 4 ? "text-success" : row.original.rating >= 3 ? "text-warning" : "text-destructive"}`}>
        {row.original.rating}
      </span>
    ),
  },
  {
    accessorKey: "earnings",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Earnings" />,
    cell: ({ row }) => <span className="font-bold text-foreground">৳{row.original.earnings.toLocaleString()}</span>,
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.status} />,
  },
];
