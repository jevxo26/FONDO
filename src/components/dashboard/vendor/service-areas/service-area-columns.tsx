// src/components/dashboard/vendor/service-areas/service-area-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorServiceArea } from "@/types/vendor";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { MapPin, Clock, DollarSign } from "lucide-react";

export const serviceAreaColumns: ColumnDef<VendorServiceArea>[] = [
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
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const area = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-sm">{area.area}</span>
          </div>
          <span className="text-xs text-muted-foreground ml-5">
            {area.upazila}, {area.district}
          </span>
          <span className="text-xs text-muted-foreground ml-5">
            {area.division}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryCharge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Charge" />
    ),
    cell: ({ row }) => {
      const charge = row.getValue("deliveryCharge") as number;
      return (
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium text-sm">৳{charge}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "minimumOrderAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Min Order" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("minimumOrderAmount") as number;
      return (
        <span className="text-sm">৳{amount}</span>
      );
    },
  },
  {
    accessorKey: "estimatedDeliveryTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. Delivery" />
    ),
    cell: ({ row }) => {
      const time = row.getValue("estimatedDeliveryTime") as number;
      return (
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm">{time} min</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant="outline" className={isActive ? "bg-success/10 text-success ring-success/20" : "bg-muted text-muted-foreground ring-muted-foreground/20"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];