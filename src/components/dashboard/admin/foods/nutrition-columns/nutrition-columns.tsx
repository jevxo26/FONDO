"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { NutritionItem } from "@/data/nutrition";
import { DataTableColumnHeader } from "@/components/common/table";
import { cn } from "@/lib/utils";

export const nutritionColumns: ColumnDef<NutritionItem>[] = [
  {
    accessorKey: "foodName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Food Item" />,
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.foodName}</span>
    ),
  },
  {
    accessorKey: "calories",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Calories" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.calories}</span>,
  },
  {
    accessorKey: "protein",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Protein" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.protein}g</span>,
  },
  {
    accessorKey: "carbs",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Carbs" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.carbs}g</span>,
  },
  {
    accessorKey: "fat",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fat" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.fat}g</span>,
  },
  {
    accessorKey: "fiber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fiber" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.fiber}g</span>,
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Base Price" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">৳{row.original.basePrice}</span>
    ),
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sale Price" />,
    cell: ({ row }) => {
      const sp = row.original.salePrice;
      return sp ? (
        <span className="font-mono text-sm font-medium text-success">৳{sp}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "calorieLevel",
    enableHiding: false,
  },
  {
    accessorKey: "discountStatus",
    enableHiding: false,
  },
  {
    id: "discount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => {
      const { basePrice, salePrice } = row.original;
      if (!salePrice) return <span className="text-sm text-muted-foreground">—</span>;
      const pct = Math.round((1 - salePrice / basePrice) * 100);
      return (
        <span
          className={cn(
            "inline-block rounded-full px-2 py-0.5 text-[11px] font-bold",
            pct > 20
              ? "bg-success/10 text-success"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
          )}
        >
          {pct}% OFF
        </span>
      );
    },
  },
];
