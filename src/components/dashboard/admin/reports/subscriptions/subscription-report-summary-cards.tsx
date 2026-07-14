import { subscriptionReportData } from "@/data/reports";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Repeat, CheckCircle, RefreshCw, DollarSign, XCircle } from "lucide-react";

export function SubscriptionReportSummaryCards() {
  const total = subscriptionReportData.length;
  const active = subscriptionReportData.filter((s) => s.status === "ACTIVE").length;
  const cancelled = subscriptionReportData.filter((s) => s.status === "CANCELLED").length;
  const renewed = subscriptionReportData.filter((s) => s.status === "RENEWED").length;
  const expired = subscriptionReportData.filter((s) => s.status === "EXPIRED").length;
  const autoRenewCount = subscriptionReportData.filter((s) => s.autoRenew).length;
  const totalRevenue = subscriptionReportData.reduce((s, sub) => s + sub.amount, 0);
  const autoRenewRate = Math.round((autoRenewCount / total) * 100);
  const topPlan = [...subscriptionReportData.reduce((acc, s) => {
    acc.set(s.plan, (acc.get(s.plan) || 0) + 1);
    return acc;
  }, new Map<string, number>())].sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <DarkCard
        icon={<Repeat className="size-10" />}
        title="Subscription Revenue"
        description={`${active} active subscribers`}
        className="flex-1"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
          <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">
            {totalRevenue.toLocaleString()}
          </h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-white/70">
          <span>{active} Active</span>
          <span>{renewed} Renewed</span>
          <span>{cancelled + expired} Churned</span>
        </div>
      </DarkCard>
      <GlassCard
        icon={<RefreshCw className="size-5 text-success" />}
        iconBg="bg-success/10"
        title="Auto-Renew Rate"
        value={`${autoRenewRate}%`}
        subtitle="Enabled by default"
        className="flex-1"
      >
        <div className="mt-4 h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-success" style={{ width: `${autoRenewRate}%` }} />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {autoRenewCount} of {total} subscriptions on auto-renew
        </div>
      </GlassCard>
      <GlassCard
        icon={<DollarSign className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Plan Distribution"
        value={topPlan[0]}
        subtitle={`${topPlan[1]} subscribers`}
        className="flex-1"
      >
        <div className="mt-4 space-y-3">
          {[...subscriptionReportData.reduce((acc, s) => {
            acc.set(s.plan, (acc.get(s.plan) || 0) + 1);
            return acc;
          }, new Map<string, number>())].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([plan, count]) => (
            <div key={plan}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-bold">{plan}</span>
                <span className="font-bold">{count}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
