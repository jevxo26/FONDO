"use client";

import { DollarSign, TrendingUp, TrendingDown, Wallet, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { useVendorEarningsPage } from "@/hooks/use-vendor-earnings";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";

function formatAmount(n: number) {
  return `৳${Number(n || 0).toLocaleString()}`;
}

export default function VendorEarningsPage() {
  const {
    todayEarnings,
    weekEarnings,
    monthEarnings,
    pendingSettlements,
    balance,
    transactions,
    settlements,
    isLoading,
  } = useVendorEarningsPage();

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Earnings" description="Track your revenue and payouts." icon={DollarSign} />
        <div className="mt-12 flex justify-center"><Loader2 className="size-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Earnings" description="Track your revenue and payouts." icon={DollarSign} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today" value={formatAmount(todayEarnings)} icon={DollarSign} accent="right" />
        <StatCard label="This Week" value={formatAmount(weekEarnings)} variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="This Month" value={formatAmount(monthEarnings)} icon={Wallet} accent="right" />
        <StatCard label="Pending Settlement" value={formatAmount(pendingSettlements)} variant="warning" icon={TrendingDown} accent="right" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-bold text-foreground">Wallet Balance</h3>
          <p className="mt-2 font-heading text-4xl font-bold text-primary">{formatAmount(balance)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Available to withdraw</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-3 font-heading text-lg font-bold text-foreground">Recent Wallet Transactions</h3>
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 8).map((tx) => {
                const credit = tx.transactionType.toUpperCase().includes("CREDIT");
                return (
                  <div key={tx.id} className="flex items-center justify-between rounded-xl bg-muted/30 px-3 py-2">
                    <span className="text-sm text-muted-foreground">{tx.remarks ?? tx.transactionType}</span>
                    <span className={`font-heading text-sm font-bold ${credit ? "text-success" : "text-destructive"}`}>
                      {credit ? "+" : "-"}{formatAmount(Number(tx.amount))}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
        <h3 className="mb-3 font-heading text-lg font-bold text-foreground">Settlements</h3>
        {settlements.length === 0 ? (
          <p className="text-sm text-muted-foreground">No settlements yet.</p>
        ) : (
          <div className="space-y-2">
            {settlements.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl bg-muted/30 px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.settlementNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.settlementPeriodStart).toLocaleDateString("en-BD")} → {new Date(s.settlementPeriodEnd).toLocaleDateString("en-BD")} · {s.totalOrders} orders
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-sm font-bold text-success">{formatAmount(Number(s.netAmount))}</p>
                  <p className="text-xs capitalize text-muted-foreground">{s.paymentStatus}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
