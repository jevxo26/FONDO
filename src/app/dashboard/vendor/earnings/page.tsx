// src/app/dashboard/vendor/earnings/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { EarningsTableSection } from "@/components/dashboard/vendor/earnings/earnings-table-section";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { vendorSettlements, vendorWalletTransactions } from "@/data/vendor-earnings";

export default function VendorEarningsPage() {
  // Calculate today's earnings (from today's settlements)
  const today = new Date().toDateString();
  const todayEarnings = vendorSettlements
    .filter((s) => new Date(s.createdAt).toDateString() === today)
    .reduce((acc, s) => acc + s.netAmount, 0);

  // Calculate this week's earnings
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekEarnings = vendorSettlements
    .filter((s) => new Date(s.createdAt) >= weekAgo)
    .reduce((acc, s) => acc + s.netAmount, 0);

  // Calculate this month's earnings
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const monthEarnings = vendorSettlements
    .filter((s) => new Date(s.createdAt) >= monthAgo)
    .reduce((acc, s) => acc + s.netAmount, 0);

  // Calculate pending settlements
  const pendingSettlements = vendorSettlements
    .filter((s) => s.paymentStatus === "PENDING" || s.paymentStatus === "PROCESSING")
    .reduce((acc, s) => acc + s.netAmount, 0);

  // Get current wallet balance
  const currentBalance = vendorWalletTransactions[vendorWalletTransactions.length - 1]?.balanceAfter || 0;

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
          value={`৳${todayEarnings.toLocaleString()}`}
          icon={DollarSign}
          accent="right"
        />
        <StatCard
          label="This Week"
          value={`৳${weekEarnings.toLocaleString()}`}
          variant="success"
          icon={TrendingUp}
          accent="right"
        />
        <StatCard
          label="This Month"
          value={`৳${monthEarnings.toLocaleString()}`}
          variant="default"
          icon={Wallet}
          accent="right"
        />
        <StatCard
          label="Pending Settlement"
          value={`৳${pendingSettlements.toLocaleString()}`}
          variant="warning"
          icon={TrendingDown}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Earnings Overview
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Balance: ৳{currentBalance.toLocaleString()}
          </p>
        </div>
        <EarningsTableSection />
      </div>
    </div>
  );
}