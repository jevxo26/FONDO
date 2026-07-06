"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { PaymentTransaction } from "@/data/payments";
import { DataTableColumnHeader } from "@/components/common/table";
import { PaymentStatusBadge } from "./payment-status-badge";

export const paymentColumns: ColumnDef<PaymentTransaction>[] = [
  {
    accessorKey: "transactionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">
        {row.original.transactionId}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary-fixed text-xs font-bold text-on-primary-fixed">
          {row.original.customerInitials}
        </div>
        <span className="text-sm font-semibold text-foreground">
          {row.original.customerName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Method" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold">{row.original.method}</span>
        <span className="text-[13px] text-muted-foreground">
          {row.original.methodDetail}
        </span>
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
      <PaymentStatusBadge status={row.original.status} />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        ৳{row.original.amount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.timestamp}
      </span>
    ),
  },
];
