"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RevenueEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "./report-badges";

const sourceLabels: Record<string, { label: string; short: string }> = {
  PLATFORM_FEE: { label: "Platform Fee", short: "Fee" },
  DELIVERY_FEE: { label: "Delivery Fee", short: "Delivery" },
  COMMISSION: { label: "Commission", short: "Comm" },
  SUBSCRIPTION: { label: "Subscription", short: "Sub" },
  ADVERTISING: { label: "Advertising", short: "Ad" },
};

export const revenueColumns: ColumnDef<RevenueEntry>[] = [
  {
    accessorKey: "source",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Source" />,
    cell: ({ row }) => (
      <span className="text-sm font-bold text-foreground">
        {sourceLabels[row.original.source]?.label || row.original.source}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.date}</span>,
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.status} />,
  },
];
