import { BarChart3, TrendingUp, Users, Wallet } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <nav className="mb-2 flex gap-2 text-xs text-muted-foreground">
        <span className="font-bold text-primary">Dashboard</span>
      </nav>
      <h2 className="font-fraunces text-4xl font-bold text-foreground">Overview</h2>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Icon className="size-5 text-primary" />
              </div>
              <p className="mt-2 font-fraunces text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-success">{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const stats = [
  {
    label: "Total Revenue",
    value: "৳428.5K",
    change: "+12.5% from last month",
    icon: Wallet,
  },
  {
    label: "Active Customers",
    value: "1,882",
    change: "+8.2% from last month",
    icon: Users,
  },
  {
    label: "Orders Today",
    value: "156",
    change: "+23.1% from yesterday",
    icon: TrendingUp,
  },
  {
    label: "Pending Settlements",
    value: "৳46.5K",
    change: "12 vendors pending",
    icon: BarChart3,
  },
];
