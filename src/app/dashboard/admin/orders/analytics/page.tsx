"use client";

import { BarChart3, DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { useOrderAnalytics } from "@/hooks/use-order-analytics";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";

const PIE_COLORS = ["#ce9d59", "#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#64748b"];

export default function OrderAnalyticsPage() {
  const { analytics, isLoading } = useOrderAnalytics();

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Order Analytics" description="Key metrics and trends for order performance." icon={BarChart3} />
        <div className="mt-12 text-center text-sm text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  const statusData = Object.entries(analytics.statusDistribution).map(([name, value]) => ({
    name: name.replace(/_/g, " ").toLowerCase(),
    value,
  }));

  return (
    <div>
      <PageHeader title="Order Analytics" description="Key metrics and trends for order performance." icon={BarChart3} />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`৳${analytics.totalRevenue.toLocaleString()}`} icon={DollarSign} accent="right" />
        <StatCard label="Avg Order Value" value={`৳${analytics.avgOrderValue.toLocaleString()}`} icon={ShoppingBag} variant="success" accent="right" />
        <StatCard label="Completion Rate" value={`${analytics.completionRate}%`} icon={TrendingUp} variant="warning" accent="right" />
        <StatCard label="Total Orders" value={analytics.totalOrders} icon={Users} accent="right" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="mb-2 font-heading text-lg font-bold text-foreground">Order Volume & Revenue (Last 30 Days)</h2>
          {analytics.dailyVolume.length > 0 ? (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.dailyVolume}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ce9d59" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ce9d59" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#ce9d59" fill="url(#rev)" name="Revenue (৳)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No order data available yet.</p>
          )}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 font-heading text-lg font-bold text-foreground">Status Distribution</h2>
          {statusData.length > 0 ? (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No status data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}