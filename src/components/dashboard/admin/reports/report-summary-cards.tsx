import { salesEntries } from "@/data/reports";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DollarSign, ShoppingCart, TrendingUp, Store } from "lucide-react";

export function ReportSummaryCards() {
  const total = salesEntries.length;
  const totalRevenue = salesEntries.reduce((s, e) => s + e.revenue, 0);
  const totalProfit = salesEntries.reduce((s, e) => s + e.profit, 0);
  const totalOrders = salesEntries.reduce((s, e) => s + e.orders, 0);
  const avgProfitMargin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0;
  const onlineRev = salesEntries.filter((e) => e.channel === "ONLINE").reduce((s, e) => s + e.revenue, 0);
  const dineRev = salesEntries.filter((e) => e.channel === "DINE_IN").reduce((s, e) => s + e.revenue, 0);
  const cateringRev = salesEntries.filter((e) => e.channel === "CATERING").reduce((s, e) => s + e.revenue, 0);
  const bestDay = [...salesEntries].sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <DarkCard
        icon={<DollarSign className="size-10" />}
        title="Total Revenue"
        description={`${avgProfitMargin}% profit margin across ${total} entries`}
        className="flex-1"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
          <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">
            {totalRevenue.toLocaleString()}
          </h2>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
          <TrendingUp className="size-4 text-success" />
          <span>Profit: ৳{totalProfit.toLocaleString()}</span>
        </div>
      </DarkCard>
      <StatCard
        label="Total Orders"
        value={totalOrders.toLocaleString()}
        icon={ShoppingCart}
        accent="bottom"
        className="flex-1"
      />
      <GlassCard
        icon={<Store className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Revenue by Channel"
        value="3 channels"
        subtitle="Online · Dine-In · Catering"
        className="flex-1"
      >
        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-bold">Online</span>
              <span className="font-bold">৳{onlineRev.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[55%] rounded-full bg-primary" />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-bold">Dine-In</span>
              <span className="font-bold">৳{dineRev.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[30%] rounded-full bg-foreground" />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-bold">Catering</span>
              <span className="font-bold">৳{cateringRev.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[15%] rounded-full bg-border" />
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          Best day: {bestDay.date} — ৳{bestDay.revenue.toLocaleString()} ({bestDay.orders} orders)
        </div>
      </GlassCard>
    </div>
  );
}
