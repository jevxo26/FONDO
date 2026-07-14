import { StatCard } from "@/components/dashboard/common/stat-card";

import { RecentActivity } from "@/components/dashboard/admin/overview/recent-activity";
import { RevenueChart } from "@/components/dashboard/admin/overview/revenue-chart";
import { BarChart3, TrendingUp, Truck, Users, Wallet } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "৳428.5K",
    trend: "up" as const,
    trendValue: "+12.5%",
    icon: Wallet,
    variant: "default" as const,
  },
  {
    label: "Orders Today",
    value: "156",
    trend: "up" as const,
    trendValue: "+23.1%",
    icon: TrendingUp,
    variant: "success" as const,
  },
  {
    label: "Active Customers",
    value: "1,882",
    trend: "up" as const,
    trendValue: "+8.2%",
    icon: Users,
    variant: "default" as const,
  },
  {
    label: "Pending Settlements",
    value: "৳46.5K",
    trend: "down" as const,
    trendValue: "-2 vendors",
    icon: BarChart3,
    variant: "warning" as const,
  },
  {
    label: "Active Riders",
    value: "42",
    trend: "up" as const,
    trendValue: "+3",
    icon: Truck,
    variant: "success" as const,
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary" />
            <h1 className="font-fraunces text-xl font-bold leading-tight tracking-tight text-foreground md:text-[32px]">
              Overview
            </h1>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <span className="hidden text-sm text-muted-foreground md:block">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="mt-2 h-px w-24 bg-gradient-to-r from-primary/40 to-transparent" />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

    </div>
  );
}
