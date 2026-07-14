import { customerReportData } from "@/data/reports";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

export function CustomerReportSummaryCards() {
  const total = customerReportData.length;
  const active = customerReportData.filter((c) => c.segment === "ACTIVE").length;
  const churned = customerReportData.filter((c) => c.segment === "CHURNED").length;
  const atRisk = customerReportData.filter((c) => c.segment === "AT_RISK").length;
  const newCustomers = customerReportData.filter((c) => c.segment === "NEW").length;
  const retentionRate = total > 0 ? Math.round(((total - churned) / total) * 100) : 0;
  const totalSpent = customerReportData.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-7">
        <DarkCard
          icon={<Users className="size-32" />}
          title="Customer Retention"
          description={`${retentionRate}% retention rate`}
        >
          <div className="mb-6">
            <span className="font-fraunces text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {(active + newCustomers + atRisk).toLocaleString()}
            </span>
            <p className="mt-1 text-sm text-white/70">
              retained out of {total} total customers
            </p>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">New</p>
              <p className="font-bold text-primary">{newCustomers}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active</p>
              <p className="font-bold text-success">{active}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">At Risk</p>
              <p className="font-bold text-warning">{atRisk}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Churned</p>
              <p className="font-bold text-destructive">{churned}</p>
            </div>
          </div>
        </DarkCard>
      </div>
      <div className="col-span-12 flex flex-col gap-6 md:col-span-5">
        <GlassCard
          icon={<UserCheck className="size-5 text-success" />}
          iconBg="bg-success/10"
          title="Active Customers"
          value={active.toString()}
          subtitle="Currently ordering"
        >
          <div className="mt-4 text-xs text-muted-foreground">
            {Math.round((active / total) * 100)}% of total customer base
          </div>
        </GlassCard>
        <GlassCard
          icon={<UserX className="size-5 text-destructive" />}
          iconBg="bg-destructive/10"
          title="Churn Rate"
          value={`${Math.round((churned / total) * 100)}%`}
          subtitle={`${churned} customers lost`}
        >
          <div className="mt-4 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-destructive" style={{ width: `${(churned / total) * 100}%` }} />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Total LTV: ৳{totalSpent.toLocaleString()}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
