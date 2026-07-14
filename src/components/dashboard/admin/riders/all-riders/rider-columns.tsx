"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Rider } from "@/data/riders";
import { DataTableColumnHeader } from "@/components/common/table";
import { RiderStatusBadge } from "./rider-status-badge";

export const riderColumns: ColumnDef<Rider>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">{row.original.name}</p>
        <p className="text-[13px] text-muted-foreground">{row.original.phone}</p>
      </div>
    ),
  },
  {
    accessorKey: "zone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Zone" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.zone}</span>
    ),
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle" />,
    cell: ({ row }) => (
      <span className="text-xs font-bold uppercase text-muted-foreground">{row.original.vehicleType}</span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <RiderStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "totalDeliveries",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deliveries" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.totalDeliveries}</span>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.rating}</span>
    ),
  },
  {
    accessorKey: "completedToday",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Today" />,
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-success">{row.original.completedToday}</span>
    ),
  },
];
