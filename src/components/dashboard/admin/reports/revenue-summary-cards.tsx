import { revenueEntries } from "@/data/reports";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { DollarSign, Landmark, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RevenueSummaryCards() {
  const totalAmount = revenueEntries.reduce((s, e) => s + e.amount, 0);
  const settled = revenueEntries.filter((e) => e.status === "SETTLED").reduce((s, e) => s + e.amount, 0);
  const disputed = revenueEntries.filter((e) => e.status === "DISPUTED").reduce((s, e) => s + e.amount, 0);
  const pending = totalAmount - settled - disputed;
  const settledRate = totalAmount > 0 ? Math.round((settled / totalAmount) * 100) : 0;
  const sources = ["PLATFORM_FEE", "DELIVERY_FEE", "COMMISSION", "SUBSCRIPTION", "ADVERTISING"] as const;
  const topSource = sources.map((src) => ({
    name: src.replace(/_/g, " "),
    amount: revenueEntries.filter((e) => e.source === src).reduce((s, e) => s + e.amount, 0),
  })).sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        <DarkCard
          icon={<DollarSign className="size-32" />}
          title="Platform Revenue"
          description={`${settledRate}% settlement rate`}
        >
          <div className="mb-6 flex items-baseline gap-2">
            <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
            <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">
              {totalAmount.toLocaleString()}
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Settled</p>
              <p className="font-bold text-success">৳{settled.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending</p>
              <p className="font-bold text-warning">৳{pending.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Disputed</p>
              <p className="font-bold text-destructive">৳{disputed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Top Source</p>
              <p className="font-bold text-white">{topSource.name}</p>
            </div>
          </div>
        </DarkCard>
      </div>
      <div className="col-span-12 flex flex-col gap-6 md:col-span-4">
        <GlassCard
          icon={<Landmark className="size-5 text-success" />}
          iconBg="bg-success/10"
          title="Settlement Progress"
          value={`${settledRate}%`}
          subtitle="Of total revenue settled"
        >
          <div className="mt-4 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-success" style={{ width: `${settledRate}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-muted-foreground">৳{settled.toLocaleString()}</span>
            <span className="text-muted-foreground">৳{pending.toLocaleString()}</span>
          </div>
        </GlassCard>
        <GlassCard
          icon={<AlertTriangle className="size-5 text-destructive" />}
          iconBg="bg-destructive/10"
          title="Disputed Items"
          value={revenueEntries.filter((e) => e.status === "DISPUTED").length.toString()}
          subtitle="Under review"
        >
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Amount: ৳{disputed.toLocaleString()}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
