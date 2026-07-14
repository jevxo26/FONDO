"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { SalesEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { ChannelBadge, StatusDotBadge } from "../report-badges";

export const salesColumns: ColumnDef<SalesEntry>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.date}</span>,
  },
  {
    accessorKey: "channel",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Channel" />,
    cell: ({ row }) => <ChannelBadge channel={row.original.channel} />,
  },
  {
    accessorKey: "orders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => <span className="font-bold text-foreground">{row.original.orders}</span>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Revenue" />,
    cell: ({ row }) => <span className="font-bold text-foreground">৳{row.original.revenue.toLocaleString()}</span>,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cost" />,
    cell: ({ row }) => <span className="text-sm text-destructive">-৳{row.original.cost.toLocaleString()}</span>,
  },
  {
    accessorKey: "profit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profit" />,
    cell: ({ row }) => (
      <span className={`font-bold ${row.original.profit > 0 ? "text-success" : "text-destructive"}`}>
        ৳{row.original.profit.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.status} />,
  },
];
