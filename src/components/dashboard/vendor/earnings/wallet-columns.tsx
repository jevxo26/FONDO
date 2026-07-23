// src/components/dashboard/vendor/earnings/wallet-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorWalletTransaction } from "@/types/vendor";
import { getTransactionTypeBadge } from "@/data/vendor-earnings";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { format } from "date-fns";

export const walletColumns: ColumnDef<VendorWalletTransaction>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{format(new Date(date), "MMM d, yyyy")}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(date), "h:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("transactionType") as VendorWalletTransaction["transactionType"];
      const badge = getTransactionTypeBadge(type);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const transaction = row.original;
      const amount = transaction.amount;
      const isCredit = transaction.transactionType === "CREDIT";
      return (
        <span className={`font-fraunces font-semibold text-sm ${isCredit ? "text-success" : "text-destructive"}`}>
          {isCredit ? "+" : "-"}৳{amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "balanceAfter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      const balance = row.getValue("balanceAfter") as number;
      return (
        <span className="font-medium text-sm">৳{balance.toLocaleString()}</span>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remarks" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("remarks")}</span>
    ),
  },
];