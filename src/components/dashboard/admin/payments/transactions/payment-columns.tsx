"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { PaymentTransaction } from "@/data/payments";
import { DataTableColumnHeader } from "@/components/common/table";
import { PaymentStatusBadge } from "./payment-status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const paymentColumns: ColumnDef<PaymentTransaction>[] = [
  {
    accessorKey: "transactionId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction ID" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">{row.original.transactionId}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground">
            {row.original.customerInitials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold text-foreground">{row.original.customerName}</p>
          <p className="text-[13px] text-muted-foreground">{row.original.customerId}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Method" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold">{row.original.method}</span>
        <span className="text-[13px] text-muted-foreground">{row.original.methodDetail}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <PaymentStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Timestamp" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.timestamp}</span>
    ),
  },
];
