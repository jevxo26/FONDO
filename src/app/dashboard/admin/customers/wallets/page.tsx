"use client";

import { useState } from "react";
import { Download, Gift, Wallet, Search, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTable } from "@/components/common/table";
import { DataTableColumnHeader } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { CustomerSearch } from "@/components/dashboard/admin/customers/common/customer-search";
import { useAdminCustomerWallet } from "@/hooks/use-admin-customers";
import type { AdminWalletTransaction, AdminCustomer } from "@/types/admin";

const typeConfig: Record<string, { dot: string; label: string }> = {
  TOPUP: { dot: "bg-success", label: "Top-up" },
  PURCHASE: { dot: "bg-destructive", label: "Purchase" },
  REFUND: { dot: "bg-primary", label: "Refund" },
  ADJUSTMENT: { dot: "bg-border", label: "Adjustment" },
  CREDIT: { dot: "bg-success", label: "Credit" },
  DEBIT: { dot: "bg-destructive", label: "Debit" },
};

const walletTxnColumns: ColumnDef<AdminWalletTransaction>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction ID" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">{row.original.id.slice(0, 8)}</span>
    ),
  },
  {
    accessorKey: "transactionType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.original.transactionType;
      const config = typeConfig[type] ?? { dot: "bg-border", label: type };
      return (
        <span className="flex items-center gap-2 text-sm">
          <span className={`h-2 w-2 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const txn = row.original;
      const isCredit = ["TOPUP", "CREDIT", "REFUND"].includes(txn.transactionType);
      return (
        <span className={`flex items-center gap-1.5 font-bold ${isCredit ? "text-success" : "text-destructive"}`}>
          {isCredit ? "+" : "-"}৳{Number(txn.amount).toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "balanceAfter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{Number(row.original.balanceAfter).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

export default function WalletsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const { data, isLoading } = useAdminCustomerWallet(
    selectedCustomer?.id ?? "",
    { page: 1, limit: 50 },
  );

  const wallet = data?.wallet;
  const transactions = data?.transactions?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Customer Wallets"
        description="Oversee liquidity across the ecosystem. Manage rewards, monitor top-ups, and analyze spending patterns."
        icon={Wallet}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export Logs
            </Button>
            <Button className="rounded-full">
              <Gift className="size-[18px]" />
              Credit Reward
            </Button>
          </>
        }
      />
      <div className="mt-6">
        <CustomerSearch
          selectedCustomer={selectedCustomer}
          onSelect={setSelectedCustomer}
          placeholder="Search customer to view their wallet..."
        />
      </div>
      {!selectedCustomer ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-fraunces text-lg font-bold text-foreground">Select a Customer</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Search for a customer above to view their wallet balance, transaction history, and manage rewards.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Balance"
              value={wallet ? `৳${Number(wallet.balance).toLocaleString()}` : "—"}
              icon={Wallet}
              accent="bottom"
            />
            <StatCard
              label="On Hold"
              value={wallet ? `৳${Number(wallet.holdBalance).toLocaleString()}` : "—"}
              variant="warning"
              icon={Clock}
              accent="bottom"
            />
        <StatCard
          label="Transaction Count"
          value={transactions.length}
          variant="success"
          icon={TrendingUp}
          accent="bottom"
        />
        <StatCard
          label="Wallet Status"
          value={wallet?.status ?? "—"}
          variant="default"
          icon={Clock}
          accent="bottom"
        />
          </div>
          <div className="mt-8">
            <DataTable
              columns={walletTxnColumns}
              data={transactions}
              isLoading={isLoading}
              pageSize={transactions.length || 10}
              enableSearch={false}
              enableColumnToggle={false}
              emptyMessage={wallet ? "No wallet transactions yet." : "No wallet found for this customer."}
            />
          </div>
        </>
      )}
    </div>
  );
}
