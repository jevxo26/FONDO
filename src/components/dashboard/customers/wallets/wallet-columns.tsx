"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { WalletTransaction } from "@/data/wallets";
import { DataTableColumnHeader } from "@/components/common/table";
import { WalletStatusBadge } from "./wallet-status-badge";

const typeConfig: Record<string, { dot: string; label: string }> = {
  TOPUP: { dot: "bg-success", label: "Top-up" },
  PURCHASE: { dot: "bg-destructive", label: "Purchase" },
  REFUND: { dot: "bg-primary", label: "Refund" },
  ADJUSTMENT: { dot: "bg-border", label: "Adjustment" },
  CREDIT: { dot: "bg-success", label: "Credit" },
  DEBIT: { dot: "bg-destructive", label: "Debit" },
};

export const walletColumns: ColumnDef<WalletTransaction>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">
        {row.original.id}
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
        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
          {row.original.customerInitials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {row.original.customerName}
          </p>
          <p className="text-[13px] text-muted-foreground">
            {row.original.walletId}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.original.transactionType;
      const config = typeConfig[type] ?? { dot: "bg-border", label: type };
      return (
        <span className="flex items-center gap-2 text-sm">
          <span className={`h-2 w-2 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const txn = row.original;
      const isCredit = ["TOPUP", "CREDIT", "REFUND"].includes(txn.transactionType);
      return (
        <span className={`font-bold ${isCredit ? "text-success" : "text-destructive"}`}>
          {isCredit ? "+" : "-"}৳{txn.amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "balanceAfter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        ৳{row.original.balanceAfter.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <WalletStatusBadge status={row.original.status} />
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
