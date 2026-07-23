// src/components/dashboard/vendor/foods/food-columns.tsx
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorFood } from "@/types/vendor";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";

const getStockBadge = (status: VendorFood["stockStatus"]) => {
  const variants = {
    IN_STOCK: { label: "In Stock", className: "bg-success/10 text-success ring-success/20" },
    LOW_STOCK: { label: "Low Stock", className: "bg-warning/10 text-warning ring-warning/20" },
    OUT_OF_STOCK: { label: "Out of Stock", className: "bg-destructive/10 text-destructive ring-destructive/20" },
  };
  return variants[status];
};

const getStatusBadge = (status: VendorFood["status"]) => {
  const variants = {
    ACTIVE: { label: "Active", className: "bg-success/10 text-success ring-success/20" },
    INACTIVE: { label: "Inactive", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  };
  return variants[status];
};

export const foodColumns: ColumnDef<VendorFood>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Food Item" />
    ),
    cell: ({ row }) => {
      const food = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-lg border border-border/50">
            <AvatarImage src={food.image} alt={food.name} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium">
              {food.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{food.name}</p>
            <p className="text-xs text-muted-foreground">{food.sku}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm">{row.getValue("category")}</span>
        <span className="text-xs text-muted-foreground">{row.original.subCategory}</span>
      </div>
    ),
  },
  {
    accessorKey: "kitchen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kitchen / Branch" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm">{row.getValue("kitchen")}</span>
        <span className="text-xs text-muted-foreground">{row.original.branch}</span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-fraunces text-lg font-bold tracking-tight text-foreground">
            ৳{price}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ৳{row.original.costPrice}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      const { minStock, maxStock } = row.original;
      const percentage = Math.min((stock / maxStock) * 100, 100);
      
      return (
        <div className="flex flex-col gap-1.5 min-w-[100px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{stock}</span>
            <span className="text-xs text-muted-foreground">
              {minStock} min
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                percentage > 60 ? "bg-success" : percentage > 30 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "stockStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("stockStatus") as VendorFood["stockStatus"];
      const badge = getStockBadge(status);
      return (
        <Badge variant="outline" className={cn("ring-1", badge.className)}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as VendorFood["status"];
      const badge = getStatusBadge(status);
      return (
        <Badge variant="outline" className={cn("ring-1", badge.className)}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orders" />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <span className="font-medium text-sm">{row.getValue("totalOrders")}</span>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-medium text-sm">{rating}</span>
        </div>
      );
    },
  },
];