import { TrendingUp, CreditCard, RefreshCw } from "lucide-react";

export function SubscriptionContextCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <GlassCard
        icon={<TrendingUp className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Subscription Revenue"
        value="৳428.5K"
        subtitle="From active subscriptions"
        valueClassName="text-foreground"
        subtitleClassName="text-muted-foreground"
      />
      <GlassCard
        icon={<CreditCard className="size-5 text-success" />}
        iconBg="bg-success/10"
        title="Avg. Subscription Value"
        value="৳18,250"
        subtitle="Per customer per cycle"
        valueClassName="text-foreground"
        subtitleClassName="text-muted-foreground"
      />
      <RenewalCard />
    </div>
  );
}

function GlassCard({
  icon,
  iconBg,
  title,
  value,
  subtitle,
  valueClassName,
  subtitleClassName,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  valueClassName: string;
  subtitleClassName: string;
}) {
  return (
    <div className="flex h-44 flex-col justify-between rounded-xl border border-border/30 bg-white/70 p-6 backdrop-blur-sm">
      <div>
        <div
          className={`mb-4 flex size-10 items-center justify-center rounded-lg ${iconBg}`}
        >
          {icon}
        </div>
        <h3 className="font-fraunces text-lg leading-tight text-foreground">
          {title}
        </h3>
      </div>
      <div>
        <p className={`font-fraunces text-[28px] ${valueClassName}`}>{value}</p>
        <p className={`mt-1 text-sm ${subtitleClassName}`}>{subtitle}</p>
      </div>
    </div>
  );
}

function RenewalCard() {
  return (
    <div className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-xl bg-foreground p-6 text-white shadow-lg">
      <div className="absolute -bottom-8 -right-8 opacity-20 transition-transform duration-500 group-hover:scale-110">
        <RefreshCw className="size-32" />
      </div>
      <div className="relative z-10">
        <h3 className="font-fraunces text-lg leading-tight">Renewal Rate</h3>
        <p className="mt-1 text-sm text-white/70">
          Customers renewing this month
        </p>
      </div>
      <div className="relative z-10">
        <p className="font-fraunces text-[28px]">78%</p>
        <p className="text-sm text-primary">+5% vs last quarter</p>
      </div>
    </div>
  );
}
