// src/components/dashboard/vendor/overview/order-pie-chart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { cn } from "@/lib/utils";

interface OrderPieChartProps {
  data?: Array<{ name: string; value: number; color: string }>;
  className?: string;
}

const defaultData = [
  { name: "Completed", value: 45, color: "#10B981" },
  { name: "Pending", value: 25, color: "#F59E0B" },
  { name: "Preparing", value: 15, color: "#3B82F6" },
  { name: "Cancelled", value: 8, color: "#EF4444" },
  { name: "Delivered", value: 7, color: "#8B5CF6" },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function OrderPieChart({ data = defaultData, className }: OrderPieChartProps) {
  const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-fraunces text-lg font-semibold text-foreground">Order Status</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">Total {totalOrders} orders</p>
          </div>
        </div>

        <div className="mt-4 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={85}
                innerRadius={45}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  boxShadow: "var(--shadow-elevated)",
                  padding: "10px 14px",
                  fontSize: "13px",
                }}
                formatter={(value) => [`${value} orders`, ""]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
