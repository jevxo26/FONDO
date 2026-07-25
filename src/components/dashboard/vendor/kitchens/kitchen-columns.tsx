// src/components/dashboard/vendor/kitchens/kitchen-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorKitchen } from "@/types/vendor";
import { getKitchenStatusBadge } from "@/data/vendor-kitchens";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { Users, Clock, ChefHat } from "lucide-react";

export const kitchenColumns: ColumnDef<VendorKitchen>[] = [
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
      <DataTableColumnHeader column={column} title="Kitchen" />
    ),
    cell: ({ row }) => {
      const kitchen = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{kitchen.name}</span>
          <span className="text-xs text-muted-foreground">{kitchen.code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("branch")}</span>
    ),
  },
  {
    accessorKey: "headChef",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Head Chef" />
    ),
    cell: ({ row }) => {
      const kitchen = row.original;
      return (
        <div className="flex items-center gap-2">
          <ChefHat className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{kitchen.headChef}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "staffCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff" />
    ),
    cell: ({ row }) => {
      const count = row.getValue("staffCount") as number;
      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">{count}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => {
      const kitchen = row.original;
      const percentage = Math.round((kitchen.currentLoad / kitchen.capacity) * 100);
      return (
        <div className="flex flex-col gap-1.5 min-w-[100px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{kitchen.currentLoad}/{kitchen.capacity}</span>
            <span className="text-xs text-muted-foreground">{percentage}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage > 80 ? "bg-destructive" : percentage > 60 ? "bg-warning" : "bg-success"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "preparationTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prep Time" />
    ),
    cell: ({ row }) => {
      const time = row.getValue("preparationTime") as number;
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{time} min</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dailyOrders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily Orders" />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-sm">{row.getValue("dailyOrders")}</span>
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
          <span className="text-yellow-500 text-sm">★</span>
          <span className="font-medium text-sm">{rating}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as VendorKitchen["status"];
      const badge = getKitchenStatusBadge(status);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
];