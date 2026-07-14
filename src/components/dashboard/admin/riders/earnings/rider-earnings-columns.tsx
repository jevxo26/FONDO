"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { RiderEarning } from "@/data/riders";
import { DataTableColumnHeader } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";

export const riderEarningsColumns: ColumnDef<RiderEarning>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rider" />,
    cell: ({ row }) => (
      <span className="text-sm font-bold text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "weekEnding",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Week Ending" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.weekEnding}</span>
    ),
  },
  {
    accessorKey: "deliveries",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deliveries" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.deliveries}</span>
    ),
  },
  {
    accessorKey: "basePay",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Base Pay" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">৳{row.original.basePay.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "bonus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Bonus" />,
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-success">+৳{row.original.bonus.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "tips",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tips" />,
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-primary">+৳{row.original.tips.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{row.original.total.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      const s = row.original.status;
      const v: Record<string, "default" | "secondary" | "outline"> = {
        PAID: "default", PROCESSING: "secondary", PENDING: "outline",
      };
      return <Badge variant={v[s]}>{s}</Badge>;
    },
  },
];
