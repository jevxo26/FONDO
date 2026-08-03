"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AdminFoodCategory } from "@/types/admin-food";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive: "bg-muted text-muted-foreground dark:bg-muted/50",
};

export const categoryColumns: ColumnDef<AdminFoodCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-lg">
          {row.original.icon ?? "🍽️"}
        </span>
        <div>
          <span className="font-medium text-foreground">{row.original.name}</span>
          <span className="block text-[11px] text-muted-foreground">
            {row.original._count.foods} foods
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => (
      <span className="max-w-[280px] truncate text-sm text-muted-foreground">
        {row.original.description ?? "—"}
      </span>
    ),
  },
  {
    id: "subCategories",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sub-Categories" />,
    cell: ({ row }) => (
      <div className="flex max-w-[320px] flex-wrap gap-1">
        {row.original.subCategories.length === 0 && (
          <span className="text-xs text-muted-foreground">None</span>
        )}
        {row.original.subCategories.slice(0, 4).map((sub) => (
          <span
            key={sub.id}
            className="inline-block rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/15"
          >
            {sub.name}
          </span>
        ))}
        {row.original.subCategories.length > 4 && (
          <span className="text-[11px] text-muted-foreground">
            +{row.original.subCategories.length - 4} more
          </span>
        )}
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
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
            statusStyles[status],
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "popular",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Popular" />,
    cell: ({ row }) =>
      row.original.popular ? (
        <span className="inline-block rounded-full bg-gold-gradient px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          Popular
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];
