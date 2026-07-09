"use client";

import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { AdminFoodItem } from "@/data/foods";
import { cn } from "@/lib/utils";
import { Star, ThumbsUp } from "lucide-react";

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
  EXTRA_HOT: "bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

const statusVariants: Record<string, "default" | "secondary" | "destructive"> = {
  ACTIVE: "default",
  DRAFT: "secondary",
  ARCHIVED: "destructive",
};

export const foodColumns: ColumnDef<AdminFoodItem>[] = [
  {
    accessorKey: "name",
    header: "Food Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="size-9 shrink-0 overflow-hidden rounded-lg bg-muted">
          <img
            src={row.original.thumbnail}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <span className="font-medium text-foreground">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "foodType",
    header: "Type",
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
    header: "Spice",
    cell: ({ row }) => {
      const spice = row.original.spiceLevel;
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
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">
        ৳{row.original.basePrice}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariants[row.original.status] || "default"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "flags",
    header: "Flags",
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
    header: "Added",
  },
];