"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/table";
import { RiderStatusBadge } from "./rider-status-badge";
import { Rider } from "@/store/api/slices/rider-api";

export const riderColumns: ColumnDef<Rider>[] = [
  {
    accessorKey: "riderCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs font-bold text-muted-foreground">
        {row.original.riderCode}
      </span>
    ),
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">
          {row.original.firstName} {row.original.lastName}
        </p>
        <p className="text-[13px] text-muted-foreground">{row.original.phone}</p>
      </div>
    ),
  },
  {
    accessorKey: "workZone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Work Zone" />,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-foreground">{row.original.workZone}</p>
        <p className="text-[11px] text-muted-foreground">
          {row.original.workZoneDistrict}, {row.original.workZoneDivision}
        </p>
      </div>
    ),
  },
  {
    id: "vehicleType",
    accessorFn: (row) => row.vehicle?.vehicleType ?? "N/A",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle" />,
    cell: ({ row }) => (
      <span className="text-xs font-bold uppercase text-muted-foreground">
        {row.original.vehicle?.vehicleType || "UNASSIGNED"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <RiderStatusBadge status={row.original?.status} />,
  },
  {
    id: "payoutMethod",
    accessorFn: (row) => row.payout?.payoutMethod ?? "N/A",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payout" />,
    cell: ({ row }) => (
      <div>
        <span className="text-xs font-semibold text-foreground">
          {row.original.payout?.payoutMethod || "NONE"}
        </span>
        {row.original.payout?.mobileWalletNumber && (
          <p className="text-[11px] text-muted-foreground">
            {row.original.payout.mobileWalletNumber}
          </p>
        )}
      </div>
    ),
  },
  {
    id: "documents",
    accessorFn: (row) => row.documents?.length || 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Docs" />,
    cell: ({ row }) => {
      const docsCount = row.original.documents?.length || 0;
      return (
        <span className="text-xs font-semibold text-muted-foreground">
          {docsCount} Uploaded
        </span>
      );
    },
  },
];