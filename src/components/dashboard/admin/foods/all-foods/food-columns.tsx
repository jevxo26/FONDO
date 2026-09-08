"use client";

import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { AdminFoodListItem } from "@/types/admin-food";
import { cn } from "@/lib/utils";
import { Star, ThumbsUp } from "lucide-react";
import { DataTableColumnHeader } from "@/components/common/table";

const foodTypeStyles: Record<string, string> = {
  VEG: "bg-success/10 text-success",
  NON_VEG: "bg-destructive/10 text-destructive",
  VEGAN: "bg-info/10 text-info",
  SEAFOOD: "bg-info/10 text-info",
};

const spiceStyles: Record<string, string> = {
  MILD: "bg-warning/10 text-warning",
  MEDIUM: "bg-warning/10 text-warning",
  HOT: "bg-destructive/10 text-destructive",
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
              className="flex size-6 items-center justify-center rounded-full bg-warning/10 text-warning"
            >
              <Star className="size-3" />
            </span>
          )}
          {isPopular && (
            <span
              title="Popular"
              className="flex size-6 items-center justify-center rounded-full bg-destructive/10 text-destructive"
            >
              <ThumbsUp className="size-3" />
            </span>
          )}
          {isRecommended && (
            <span
              title="Recommended"
              className="flex size-6 items-center justify-center rounded-full bg-info/10 text-info"
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
