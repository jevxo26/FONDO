"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Subscription } from "@/data/subscriptions";
import { DataTableColumnHeader } from "@/components/common/table";
import { SubscriptionStatusBadge } from "./subscription-status-badge";

export const subscriptionColumns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "subscriptionNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub #" />
    ),
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        {row.original.subscriptionNumber}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">
          {row.original.customerName}
        </p>
        <p className="text-[13px] text-muted-foreground">
          {row.original.customerId}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "packageName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-foreground">
          {row.original.packageName}
        </p>
        <p className="text-[13px] text-muted-foreground">
          {row.original.durationDays} days
        </p>
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">
          ৳{row.original.totalAmount.toLocaleString()}
        </p>
        {row.original.remainingAmount > 0 && (
          <p className="text-[11px] text-destructive">
            ৳{row.original.remainingAmount.toLocaleString()} due
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <SubscriptionStatusBadge status={row.original.status} />
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        <p>{row.original.startDate}</p>
        <p className="text-[13px]">→ {row.original.endDate}</p>
      </div>
    ),
  },
];
