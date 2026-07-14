"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Coupon } from "@/data/payments";
import { DataTableColumnHeader } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";

export const couponColumns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold uppercase text-foreground">{row.original.code}</span>
    ),
  },
  {
    accessorKey: "discount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        {row.original.discountType === "PERCENTAGE" ? `${row.original.discount}%` : `৳${row.original.discount}`}
      </span>
    ),
  },
  {
    accessorKey: "minOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Min Order" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">৳{row.original.minOrder}</span>
    ),
  },
  {
    accessorKey: "usedCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Used" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.usedCount}/{row.original.maxUses}
      </span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const s = row.original.status;
      const v: Record<string, "default" | "secondary" | "destructive"> = {
        ACTIVE: "default", EXPIRED: "secondary", DISABLED: "destructive",
      };
      return <Badge variant={v[s]}>{s}</Badge>;
    },
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expires" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.expiresAt}</span>
    ),
  },
];
