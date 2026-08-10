"use client";

import { DollarSign, TrendingUp, TrendingDown, Wallet, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { EarningsTableSection } from "@/components/dashboard/vendor/earnings/earnings-table-section";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import {
  useGetVendorWalletQuery,
  useGetVendorWalletTransactionsQuery,
  useGetVendorSettlementsQuery,
} from "@/store/api/slices/vendor-settlement-api";

function formatAmount(n: number) {
  return `৳${Number(n || 0).toLocaleString()}`;
}

export default function VendorEarningsPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const vendorId = vendor?.id;

  const { data: wallet, isLoading: walletLoading } = useGetVendorWalletQuery(vendorId || "", {
    skip: !vendorId,
  });
  const { data: transactions, isLoading: txLoading } = useGetVendorWalletTransactionsQuery(
    vendorId || "",
    {
      skip: !vendorId,
    },
  );
  const { data: settlements, isLoading: settlementsLoading } = useGetVendorSettlementsQuery(
    vendorId || "",
    {
      skip: !vendorId,
    },
  );

  const isLoading = vendorLoading || walletLoading || txLoading || settlementsLoading;

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title="Earnings"
          description="Track your revenue and payouts."
          icon={DollarSign}
        />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const balance = wallet?.balance || 0;
  const txList = transactions ?? [];
  const settlementList = settlements ?? [];

  // Calculate today, week, month earnings from transactions
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(today);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const todayEarnings = txList
    .filter(
      (tx) =>
        new Date(tx.createdAt) >= today && tx.transactionType.toUpperCase().includes("CREDIT"),
    )
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const weekEarnings = txList
    .filter(
      (tx) =>
        new Date(tx.createdAt) >= weekAgo && tx.transactionType.toUpperCase().includes("CREDIT"),
    )
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const monthEarnings = txList
    .filter(
      (tx) =>
        new Date(tx.createdAt) >= monthAgo && tx.transactionType.toUpperCase().includes("CREDIT"),
    )
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const pendingSettlements = settlementList
    .filter((s) => s.paymentStatus === "PENDING" || s.paymentStatus === "PROCESSING")
    .reduce((sum, s) => sum + Number(s.netAmount || 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Earnings"
        description="Track your revenue and payouts."
        icon={DollarSign}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today"
          value={formatAmount(todayEarnings)}
          icon={DollarSign}
          accent="right"
        />
        <StatCard
          label="This Week"
          value={formatAmount(weekEarnings)}
          variant="success"
          icon={TrendingUp}
          accent="right"
        />
        <StatCard
          label="This Month"
          value={formatAmount(monthEarnings)}
          icon={Wallet}
          accent="right"
        />
        <StatCard
          label="Pending Settlement"
          value={formatAmount(pendingSettlements)}
          variant="warning"
          icon={TrendingDown}
          accent="right"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-bold text-foreground">Wallet Balance</h3>
          <p className="mt-2 font-heading text-4xl font-bold text-primary">
            {formatAmount(balance)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Available to withdraw</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-3 font-heading text-lg font-bold text-foreground">
            Recent Wallet Transactions
          </h3>
          {txList.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {txList.slice(0, 8).map((tx) => {
                const credit = tx.transactionType.toUpperCase().includes("CREDIT");
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-xl bg-muted/30 px-3 py-2"
                  >
                    <span className="text-sm text-muted-foreground">
                      {tx.remarks ?? tx.transactionType}
                    </span>
                    <span
                      className={`font-heading text-sm font-bold ${credit ? "text-success" : "text-destructive"}`}
                    >
                      {credit ? "+" : "-"}
                      {formatAmount(Number(tx.amount))}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <EarningsTableSection
        settlements={settlementList}
        transactions={txList}
        isLoading={isLoading}
      />
    </div>
  );
}
