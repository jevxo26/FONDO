"use client";

import { DataTable } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/data/vendors";

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "Vendor Name",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.name}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
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
    header: "Kitchen",
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
  },
];

export function VendorsTable({ vendors }: { vendors: Vendor[] }) {
  return (
    <DataTable
      data={vendors}
      columns={columns}
      rowActions={[
        {
          label: "View",
          onClick: (vendor) => console.log("View", vendor),
        },
      ]}
    />
  );
}
