"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RefundRequest } from "@/data/payments";
import { DataTableColumnHeader } from "@/components/common/table";
import { RefundStatusBadge } from "../transactions/payment-status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const refundColumns: ColumnDef<RefundRequest>[] = [
  {
    accessorKey: "transactionId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction" />,
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
        <span className="text-sm font-bold text-foreground">{row.original.customerName}</span>
      </div>
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
    accessorKey: "reason",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reason" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.reason}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <RefundStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "requestedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.requestedAt}</span>
    ),
  },
];
