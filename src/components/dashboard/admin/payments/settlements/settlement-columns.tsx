"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Settlement } from "@/data/payments";
import { DataTableColumnHeader } from "@/components/common/table";
import { SettlementStatusBadge } from "../transactions/payment-status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const settlementColumns: ColumnDef<Settlement>[] = [
  {
    accessorKey: "vendorName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground">
            {row.original.vendorInitials}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-bold text-foreground">{row.original.vendorName}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gross" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "fee",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fee" />,
    cell: ({ row }) => (
      <span className="text-sm text-destructive">-৳{row.original.fee.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "netAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Net" />,
    cell: ({ row }) => (
      <span className="font-bold text-success">৳{row.original.netAmount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "period",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.period}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <SettlementStatusBadge status={row.original.status} />,
  },
];
