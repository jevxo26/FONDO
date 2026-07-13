import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function VendorEarningsPage() {
  return (
    <div>
      <PageHeader
        title="Earnings"
        description="Track your revenue and payouts."
        icon={DollarSign}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today" value="৳12,450" icon={DollarSign} accent="right" />
        <StatCard label="This Week" value="৳78,200" variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="This Month" value="৳3,42,800" variant="default" icon={Wallet} accent="right" />
        <StatCard label="Pending Settlement" value="৳45,000" variant="warning" icon={TrendingDown} accent="right" />
      </div>
    </div>
  );
}
