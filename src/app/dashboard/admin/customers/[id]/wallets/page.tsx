"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatCard } from "@/components/dashboard/common/stat-card";
import {
  useAdminCustomerWallet,
  type AdminWalletTransaction,
} from "@/hooks/use-admin-customers";
import type { ColumnDef } from "@tanstack/react-table";

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
      const AmountIcon = isCredit ? TrendingUp : TrendingDown;
      return (
        <span className={`flex items-center gap-1.5 font-bold ${isCredit ? "text-success" : "text-destructive"}`}>
          <AmountIcon className="size-3.5" />
          {isCredit ? "+" : "-"}৳{Number(txn.amount).toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "balanceAfter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        ৳{Number(row.original.balanceAfter).toLocaleString()}
      </span>
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

export default function CustomerWalletPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAdminCustomerWallet(id, { page: 1, limit: 50 });

  const wallet = data?.wallet;
  const transactions = data?.transactions?.items ?? [];

  return (
    <div>
      <Link
        href={`/dashboard/admin/customers/${id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Customer
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-fraunces text-2xl font-bold text-foreground">Wallet</h1>
        <div className="flex gap-1">
          <Link href={`/dashboard/admin/customers/${id}`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Overview</Link>
          <Link href={`/dashboard/admin/customers/${id}/orders`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Orders</Link>
          <Link href={`/dashboard/admin/customers/${id}/subscriptions`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Subscriptions</Link>
          <Link href={`/dashboard/admin/customers/${id}/payments`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Payments</Link>
          <Link href={`/dashboard/admin/customers/${id}/wallets`} className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase text-primary-foreground">Wallet</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          label="Transactions"
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
    </div>
  );
}
