import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DollarSign, TrendingUp, Wallet, Star } from "lucide-react";

export default function RiderEarningsPage() {
  return (
    <div>
      <PageHeader
        title="Earnings"
        description="Track your delivery earnings and tips."
        icon={DollarSign}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today" value="৳1,850" icon={DollarSign} accent="right" />
        <StatCard label="This Week" value="৳11,200" variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="Pending Payout" value="৳4,500" variant="warning" icon={Wallet} accent="right" />
        <StatCard label="Rating" value="4.8 ★" variant="default" icon={Star} accent="right" />
      </div>
    </div>
  );
}
