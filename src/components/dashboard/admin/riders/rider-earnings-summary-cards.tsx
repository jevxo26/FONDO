import { riderEarnings } from "@/data/riders";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { DollarSign, Award, TrendingUp, Wallet } from "lucide-react";

export function RiderEarningsSummaryCards() {
  const paid = riderEarnings.filter((e) => e.status === "PAID").reduce((s, e) => s + e.total, 0);
  const pending = riderEarnings.filter((e) => e.status !== "PAID").reduce((s, e) => s + e.total, 0);
  const totalDeliveries = riderEarnings.reduce((s, e) => s + e.deliveries, 0);
  const totalBonus = riderEarnings.reduce((s, e) => s + e.bonus, 0);
  const topEarner = [...riderEarnings].sort((a, b) => b.total - a.total)[0];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-7">
        <DarkCard
          icon={<DollarSign className="size-32" />}
          title="Total Payouts"
          description={`${totalDeliveries} deliveries across ${riderEarnings.length} riders`}
        >
          <div className="mb-6 flex items-baseline gap-2">
            <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
            <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">
              {paid.toLocaleString()}
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending</p>
              <p className="font-bold text-warning">৳{pending.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Bonus Paid</p>
              <p className="font-bold text-success">৳{totalBonus.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Top Earner</p>
              <p className="font-bold text-white">{topEarner.name}</p>
            </div>
          </div>
        </DarkCard>
      </div>
      <div className="col-span-12 flex flex-col gap-6 md:col-span-5">
        <GlassCard
          icon={<Award className="size-5 text-success" />}
          iconBg="bg-success/10"
          title="Highest Earner"
          value={topEarner.name}
          subtitle={`৳${topEarner.total.toLocaleString()} total`}
        >
          <div className="mt-4 text-xs text-muted-foreground">
            {topEarner.deliveries} deliveries · ৳{topEarner.bonus} bonus · ৳{topEarner.tips} tips
          </div>
        </GlassCard>
        <GlassCard
          icon={<Wallet className="size-5 text-warning" />}
          iconBg="bg-warning/10"
          title="Pending Payouts"
          value={`৳${pending.toLocaleString()}`}
          subtitle="Awaiting release"
        >
          <div className="mt-4 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-warning"
              style={{ width: `${(pending / (paid + pending)) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {Math.round((pending / (paid + pending)) * 100)}% still pending
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
