"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { PendingVendor } from "@/data/vendors";
import { DataTableColumnHeader } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/data/vendors";

export const pendingColumns: ColumnDef<PendingVendor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor Name" />,
    cell: ({ row }) => <span className="font-bold text-foreground">{row.original.name}</span>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.type}</span>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.location}</span>,
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status)}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "applied",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Applied" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.applied}</span>,
  },
];
