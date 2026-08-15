"use client";

import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { AdminFoodListItem } from "@/types/admin-food";
import { cn } from "@/lib/utils";
import { Star, ThumbsUp } from "lucide-react";
import { DataTableColumnHeader } from "@/components/common/table";

const foodTypeStyles: Record<string, string> = {
  VEG: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  NON_VEG: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  VEGAN: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  SEAFOOD: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

const spiceStyles: Record<string, string> = {
  MILD: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  MEDIUM: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  HOT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusVariants: Record<string, "default" | "secondary" | "destructive"> = {
  ACTIVE: "default",
  DRAFT: "secondary",
  ARCHIVED: "destructive",
};

export const foodColumns: ColumnDef<AdminFoodListItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Food Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="size-9 shrink-0 overflow-hidden rounded-lg bg-muted">
          {row.original.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.original.thumbnail} alt="" className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-[10px] text-muted-foreground">
              FD
            </div>
          )}
        </div>
        <div>
          <span className="font-medium text-foreground">{row.original.name}</span>
          <p className="text-[11px] text-muted-foreground">{row.original.foodCode}</p>
        </div>
      </div>
    ),
  },
  {
    id: "categoryName",
    accessorFn: (row) => row.category?.name ?? "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.category?.name ?? "—"}</span>
    ),
  },
  {
    id: "vendor",
    accessorFn: (row) => row.vendors[0]?.businessName ?? "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.vendors[0]?.businessName ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "foodType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.original.foodType;
      return (
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            foodTypeStyles[type],
          )}
        >
          {type.replace("_", " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "spiceLevel",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Spice" />,
    cell: ({ row }) => {
      const spice = row.original.spiceLevel;
      if (!spice) return <span className="text-sm text-muted-foreground">—</span>;
      return (
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            spiceStyles[spice],
          )}
        >
          {spice.replace("_", " ")}
        </span>
      );
    },
  },
  {
    id: "basePrice",
    accessorFn: (row) => row.basePrice ?? 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">
        {row.original.basePrice != null ? `৳${row.original.basePrice.toLocaleString()}` : "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={statusVariants[row.original.status] || "default"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "flags",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Flags" />,
    cell: ({ row }) => {
      const { isFeatured, isPopular, isRecommended } = row.original;
      return (
        <div className="flex items-center gap-1.5">
          {isFeatured && (
            <span
              title="Featured"
              className="flex size-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
            >
              <Star className="size-3" />
            </span>
          )}
          {isPopular && (
            <span
              title="Popular"
              className="flex size-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
            >
              <ThumbsUp className="size-3" />
            </span>
          )}
          {isRecommended && (
            <span
              title="Recommended"
              className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            >
              <Star className="size-3" />
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Added" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];
