import { TrendingUp, CreditCard, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/common/cards/glass-card";
import { DarkCard } from "@/components/common/cards/dark-card";

export function SubscriptionContextCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <GlassCard
        layout="stack"
        icon={<TrendingUp className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Subscription Revenue"
        value="৳428.5K"
        subtitle="From active subscriptions"
        valueClassName="text-foreground"
        subtitleClassName="text-muted-foreground"
      />
      <GlassCard
        layout="stack"
        icon={<CreditCard className="size-5 text-success" />}
        iconBg="bg-success/10"
        title="Avg. Subscription Value"
        value="৳18,250"
        subtitle="Per customer per cycle"
        valueClassName="text-foreground"
        subtitleClassName="text-muted-foreground"
      />
      <DarkCard
        icon={<RefreshCw className="size-32" />}
        title="Renewal Rate"
        description="Customers renewing this month"
      >
        <p className="font-fraunces text-[28px]">78%</p>
        <p className="text-sm text-primary">+5% vs last quarter</p>
      </DarkCard>
    </div>
  );
}
