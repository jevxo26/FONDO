"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AdminFoodListItem } from "@/types/admin-food";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-warning/10 text-warning",
  APPROVED: "bg-success/10 text-success",
  REJECTED: "bg-destructive/10 text-destructive",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const approvalColumns: ColumnDef<AdminFoodListItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Food Item" />,
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "vendors",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.vendors.map((v) => v.businessName).join(", ") || "—"}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <span className="inline-block rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/15">
        {row.original.category?.name ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Base Price" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">
        ৳{row.original.basePrice?.toLocaleString() ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const label = status.charAt(0) + status.slice(1).toLowerCase();
      return (
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusStyles[status],
          )}
        >
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Submitted" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.original.createdAt)}</span>
    ),
  },
];
