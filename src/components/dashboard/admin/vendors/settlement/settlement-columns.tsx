"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { VendorSettlement } from "@/data/vendors";
import { DataTableColumnHeader } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";

function getSettlementVariant(status: string) {
  switch (status) {
    case "Settled": return "default";
    case "Flagged": return "destructive";
    default: return "secondary";
  }
}

export const settlementColumns: ColumnDef<VendorSettlement>[] = [
  {
    accessorKey: "vendor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor Name" />,
    cell: ({ row }) => (
      <div>
        <p className="font-bold text-foreground">{row.original.vendor}</p>
        <p className="text-[13px] text-muted-foreground">{row.original.branch}</p>
      </div>
    ),
  },
  {
    accessorKey: "settlementId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Settlement ID" />,
    cell: ({ row }) => (
      <span className="text-sm font-mono text-muted-foreground">{row.original.settlementId}</span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => <span className="text-sm">{row.original.date}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={getSettlementVariant(row.original.status)}>{row.original.status}</Badge>
    ),
  },
];
