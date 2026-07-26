// src/components/dashboard/vendor/bank-accounts/bank-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorBankAccount } from "@/types/vendor";
import { getAccountTypeBadge, getBankAccountStatusBadge } from "@/data/vendor-bank-accounts";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { Building2, CreditCard, Star, Smartphone } from "lucide-react";

export const bankColumns: ColumnDef<VendorBankAccount>[] = [
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
    accessorKey: "bankName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank / Provider" />
    ),
    cell: ({ row }) => {
      const account = row.original;
      const isMobile = account.accountType === "MOBILE_BANKING";
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <Smartphone className="h-4 w-4 text-primary" />
            ) : (
              <Building2 className="h-4 w-4 text-primary" />
            )}
            <span className="font-medium text-sm">{account.bankName}</span>
            {account.isPrimary && (
              <Badge variant="outline" className="bg-primary/10 text-primary ring-primary/20 text-[10px]">
                <Star className="h-3 w-3 mr-1 fill-primary" />
                Primary
              </Badge>
            )}
          </div>
          {!isMobile && (
            <span className="text-xs text-muted-foreground ml-6">{account.branchName}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "accountName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("accountName")}</span>
    ),
  },
  {
    accessorKey: "accountNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Number" />
    ),
    cell: ({ row }) => {
      const account = row.original;
      const isMobile = account.accountType === "MOBILE_BANKING";
      return (
        <div className="flex items-center gap-2">
          <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-mono text-sm">{account.accountNumber}</span>
          {isMobile && (
            <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-500 ring-purple-500/20">
              Mobile
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "accountType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("accountType") as VendorBankAccount["accountType"];
      const badge = getAccountTypeBadge(type);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "routingNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Routing #" />
    ),
    cell: ({ row }) => {
      const routing = row.getValue("routingNumber") as string;
      return (
        <span className="text-sm font-mono">
          {routing || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as VendorBankAccount["status"];
      const badge = getBankAccountStatusBadge(status);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
];