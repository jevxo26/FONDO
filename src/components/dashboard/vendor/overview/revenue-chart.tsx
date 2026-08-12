"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartProps {
  data?: Array<{ day: string; revenue: number }>;
  isLoading?: boolean; // ← ADD THIS LINE
}

const defaultData = [
  { day: "Mon", revenue: 0 },
  { day: "Tue", revenue: 0 },
  { day: "Wed", revenue: 0 },
  { day: "Thu", revenue: 0 },
  { day: "Fri", revenue: 0 },
  { day: "Sat", revenue: 0 },
  { day: "Sun", revenue: 0 },
];

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  const chartData = data && data.length > 0 ? data : defaultData;
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  if (isLoading) {
    return (
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] p-6">
        <div className="flex h-[280px] items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading chart...</div>
        </div>
      </div>
    );
  }

  if (totalRevenue === 0) {
    return (
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] p-6">
        <div className="flex h-[280px] flex-col items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">No revenue data available</p>
          <p className="text-xs text-muted-foreground/60">Start accepting orders to see revenue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Revenue</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">Last 7 days</p>
          </div>
          <span className="font-heading text-2xl font-bold text-primary">
            ৳{(totalRevenue / 1000).toFixed(1)}K
          </span>
        </div>
        <div className="mt-6 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={36} barGap={8}>
              <defs>
                <linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickFormatter={(v: number) => `৳${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  boxShadow: "var(--shadow-elevated)",
                  padding: "12px 16px",
                  fontSize: "13px",
                }}
                formatter={(value) => [`৳${Number(value).toLocaleString()}`, "Revenue"]}
                cursor={{ fill: "var(--primary)", opacity: 0.06 }}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill="url(#goldBar)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
