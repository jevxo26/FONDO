"use client";

import { DataTable, DataTableColumnHeader } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/data/vendors";
import { Eye, ShieldBan, ShieldCheck } from "lucide-react";

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor Name" />,
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.name}</span>,
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "ACTIVE" ? "default" : status === "PENDING" ? "secondary" : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "kitchen",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kitchen" />,
  },
  {
    accessorKey: "joined",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined Date" />,
  },
];

const rowActions: RowAction<Vendor>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (vendor) => console.log("View", vendor.id),
  },
  {
    label: "Suspend Vendor",
    icon: <ShieldBan className="size-4" />,
    variant: "destructive",
    onClick: (vendor) => console.log("Suspend", vendor.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ShieldCheck className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Pending", value: "PENDING" },
    { label: "Suspended", value: "SUSPENDED" },
  ],
};

export function VendorsTable({ vendors }: { vendors: Vendor[] }) {
  return (
    <DataTable
      data={vendors}
      columns={columns}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
