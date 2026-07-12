"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AdminCategory } from "@/data/categories-data";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  DRAFT: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export const categoryColumns: ColumnDef<AdminCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className="text-lg">{row.original.icon}</span>
        <span className="font-medium text-foreground">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => (
      <span className="max-w-[280px] truncate text-sm text-muted-foreground">
        {row.original.description}
      </span>
    ),
  },
  {
    id: "subCategories",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sub-Categories" />,
    cell: ({ row }) => (
      <div className="flex max-w-[320px] flex-wrap gap-1">
        {row.original.subCategories.map((sub) => (
          <span
            key={sub.id}
            className="inline-block rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/15"
          >
            {sub.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusStyles[status],
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
  },
];
