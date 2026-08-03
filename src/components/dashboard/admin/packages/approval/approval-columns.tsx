"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AdminPackageListItem } from "@/store/api/slices/packages-api";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  APPROVED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const packageApprovalColumns: ColumnDef<AdminPackageListItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Package" />,
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <span className="font-medium text-foreground">{row.original.name}</span>
        <p className="text-xs text-muted-foreground">{row.original.packageCode}</p>
      </div>
    ),
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.vendor?.businessName ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "packageCategory",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <span className="inline-block rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/15">
        {row.original.packageCategory?.name ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "durationDays",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.durationDays} days</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">
        ৳{Number(row.original.price).toLocaleString()}
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
