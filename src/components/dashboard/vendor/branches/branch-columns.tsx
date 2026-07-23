// src/components/dashboard/vendor/branches/branch-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorBranch } from "@/types/vendor";
import { getBranchStatusBadge } from "@/data/vendor-branches";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { MapPin, Phone, Mail, Star } from "lucide-react";

export const branchColumns: ColumnDef<VendorBranch>[] = [
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
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      const branch = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{branch.branchName}</span>
            {branch.isMainBranch && (
              <Badge variant="outline" className="bg-primary/10 text-primary ring-primary/20 text-[10px]">
                <Star className="h-3 w-3 mr-1 fill-primary" />
                Main
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{branch.branchCode}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const branch = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm">{branch.area}</span>
          </div>
          <span className="text-xs text-muted-foreground ml-5">
            {branch.district}, {branch.division}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const branch = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm">{branch.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{branch.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      const branch = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{branch.house}, {branch.road}</span>
          <span className="text-xs text-muted-foreground">
            {branch.upazila}, {branch.postalCode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "coordinates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coordinates" />
    ),
    cell: ({ row }) => {
      const branch = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs">{branch.latitude}</span>
          <span className="text-xs text-muted-foreground">{branch.longitude}</span>
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
      const status = row.getValue("status") as VendorBranch["status"];
      const badge = getBranchStatusBadge(status);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
];