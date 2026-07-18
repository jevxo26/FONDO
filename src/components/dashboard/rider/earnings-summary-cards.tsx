import { DollarSign, TrendingUp, Wallet, Star } from "lucide-react";
import { StatCard } from "@/components/dashboard/common/stat-card";

interface EarningsSummaryProps {
  today: string;
  week: string;
  pending: string;
  rating: number;
}

export function EarningsSummaryCards({ today, week, pending, rating }: EarningsSummaryProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Today" value={today} icon={DollarSign} accent="right" />
      <StatCard label="This Week" value={week} variant="success" icon={TrendingUp} accent="right" />
      <StatCard label="Pending Payout" value={pending} variant="warning" icon={Wallet} accent="right" />
      <StatCard label="Rating" value={`${rating} ★`} variant="default" icon={Star} accent="right" />
    </div>
  );
}
