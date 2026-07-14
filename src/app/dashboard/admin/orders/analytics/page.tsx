import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { orders } from "@/data/orders";
import { BarChart3, DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

export default function OrderAnalyticsPage() {
  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const avgOrderValue = Math.round(totalRevenue / orders.length);
  const completed = orders.filter(
    (o) => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED",
  ).length;
  const cancelled = orders.filter(
    (o) => o.orderStatus === "CANCELLED" || o.orderStatus === "REFUNDED",
  ).length;
  const completionRate = Math.round((completed / orders.length) * 100);

  return (
    <div>
      <PageHeader
        title="Order Analytics"
        description="Key metrics and trends for order performance."
        icon={BarChart3}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={`৳${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          accent="right"
        />
        <StatCard
          label="Avg Order Value"
          value={`৳${avgOrderValue.toLocaleString()}`}
          icon={ShoppingBag}
          variant="success"
          accent="right"
        />
        <StatCard
          label="Completion Rate"
          value={`${completionRate}%`}
          icon={TrendingUp}
          variant="warning"
          accent="right"
        />
        <StatCard
          label="Total Orders"
          value={orders.length}
          icon={Users}
          accent="right"
        />
      </div>

      <div className="mt-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 font-fraunces text-lg font-bold text-foreground">
            Order Volume (Last 30 Days)
          </h2>
          <p className="text-sm text-muted-foreground">
            Charts and detailed order analytics will appear here — revenue trends, order volume by hour, vendor performance, delivery times.
          </p>
        </div>
      </div>
    </div>
  );
}
