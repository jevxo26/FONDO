"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { SubscriptionReportEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "./report-badges";

export const subscriptionReportColumns: ColumnDef<SubscriptionReportEntry>[] = [
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.original.customerName}</span>,
  },
  {
    accessorKey: "plan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
    cell: ({ row }) => <span className="text-sm font-semibold text-foreground">{row.original.plan}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => <span className="font-bold text-foreground">৳{row.original.amount.toLocaleString()}</span>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.startDate}</span>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.endDate}</span>,
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.status} />,
  },
  {
    accessorKey: "autoRenew",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Auto-Renew" />,
    cell: ({ row }) => (
      <span className={`text-[11px] font-bold uppercase ${row.original.autoRenew ? "text-success" : "text-muted-foreground"}`}>
        {row.original.autoRenew ? "Yes" : "No"}
      </span>
    ),
  },
];
