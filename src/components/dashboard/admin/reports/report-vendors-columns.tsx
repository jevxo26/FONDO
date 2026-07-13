"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { VendorReportEntry } from "@/data/reports";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "./report-badges";

export const vendorReportColumns: ColumnDef<VendorReportEntry>[] = [
  {
    accessorKey: "vendorName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.original.vendorName}</span>,
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => <span className="font-bold text-foreground">{row.original.totalOrders}</span>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Revenue" />,
    cell: ({ row }) => <span className="font-bold text-foreground">৳{row.original.revenue.toLocaleString()}</span>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Commission" />,
    cell: ({ row }) => <span className="font-semibold text-primary">৳{row.original.commission.toLocaleString()}</span>,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <span className={`font-bold ${row.original.rating >= 4 ? "text-success" : row.original.rating >= 3 ? "text-warning" : "text-destructive"}`}>
        {row.original.rating}
      </span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusDotBadge status={row.original.status} />,
  },
  {
    accessorKey: "lastPayout",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Payout" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastPayout}</span>,
  },
];
