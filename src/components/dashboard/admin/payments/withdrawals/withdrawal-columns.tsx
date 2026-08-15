"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AdminWithdrawListItem } from "@/store/api/slices/wallet-api";
import { DataTableColumnHeader } from "@/components/common/table";
import { WithdrawalStatusBadge } from "./withdrawal-status-badge";

export const withdrawalColumns: ColumnDef<AdminWithdrawListItem>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const c = row.original.wallet.customer;
      return (
        <div>
          <p className="font-medium text-foreground">
            {`${c.firstName} ${c.lastName}`.trim() || "—"}
          </p>
          <p className="text-xs text-muted-foreground">{c.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "wallet",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Wallet" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.wallet.walletNumber}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">৳{Number(row.original.amount).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "withdrawMethod",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Method" />,
    cell: ({ row }) => (
      <span className="text-sm capitalize text-muted-foreground">
        {row.original.withdrawMethod.replace("_", " ")}
      </span>
    ),
  },
  {
    accessorKey: "accountNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Account" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.accountNumber}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <WithdrawalStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];
