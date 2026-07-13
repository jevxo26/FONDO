"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ApprovalItem } from "@/data/food-approvals";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  APPROVED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  CHANGES_REQUESTED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export const approvalColumns: ColumnDef<ApprovalItem>[] = [
  {
    accessorKey: "foodName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Food Item" />,
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.foodName}</span>
    ),
  },
  {
    accessorKey: "vendorName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.vendorName}</span>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <span className="inline-block rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/15">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Base Price" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">৳{row.original.basePrice}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const label = status === "CHANGES_REQUESTED" ? "Changes Req." : status.charAt(0) + status.slice(1).toLowerCase();
      return (
        <span className={cn(
          "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
          statusStyles[status],
        )}>
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Submitted" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.submittedAt}</span>
    ),
  },
];
