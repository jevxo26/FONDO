// src/components/dashboard/vendor/earnings/settlement-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorSettlement } from "@/types/vendor";
import { getSettlementStatusBadge } from "@/data/vendor-earnings";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { format } from "date-fns";

export const settlementColumns: ColumnDef<VendorSettlement>[] = [
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
    accessorKey: "settlementNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Settlement #" />
    ),
    cell: ({ row }) => {
      const settlement = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{settlement.settlementNumber}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(settlement.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "period",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period" />
    ),
    cell: ({ row }) => {
      const settlement = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">
            {format(new Date(settlement.periodStart), "MMM d")}
          </span>
          <span className="text-xs text-muted-foreground">
            to {format(new Date(settlement.periodEnd), "MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orders" />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-sm">{row.getValue("totalOrders")}</span>
    ),
  },
  {
    accessorKey: "grossAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gross" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("grossAmount") as number;
      return (
        <span className="font-fraunces font-semibold text-sm text-foreground">
          ৳{amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "commissionAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("commissionAmount") as number;
      return (
        <span className="text-sm text-destructive">
          -৳{amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "netAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("netAmount") as number;
      return (
        <span className="font-fraunces text-base font-bold tracking-tight text-primary">
          ৳{amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as VendorSettlement["paymentStatus"];
      const badge = getSettlementStatusBadge(status);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <span className="text-sm">
          {format(new Date(date), "MMM d, yyyy")}
        </span>
      );
    },
  },
];