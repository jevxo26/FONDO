"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerReportEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "../report-badges";

export const customerReportColumns: ColumnDef<CustomerReportEntry>[] = [
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.original.customerName}</span>,
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => <span className="font-bold text-foreground">{row.original.totalOrders}</span>,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Spent" />,
    cell: ({ row }) => <span className="font-bold text-foreground">৳{row.original.totalSpent.toLocaleString()}</span>,
  },
  {
    accessorKey: "avgOrderValue",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Avg Order" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">৳{row.original.avgOrderValue.toLocaleString()}</span>,
  },
  {
    accessorKey: "segment",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Segment" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.segment} />,
  },
  {
    accessorKey: "lifetimeDays",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lifetime" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lifetimeDays} days</span>,
  },
  {
    accessorKey: "lastOrderDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Order" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastOrderDate}</span>,
  },
];
