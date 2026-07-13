import { Repeat, CheckCircle, XCircle, RefreshCw, Clock, Download } from "lucide-react";
import { subscriptionReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportSubscriptionsSection } from "@/components/dashboard/admin/reports/report-subscriptions-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function ReportsSubscriptionsPage() {
  const total = subscriptionReportData.length;
  const active = subscriptionReportData.filter((s) => s.status === "ACTIVE").length;
  const cancelled = subscriptionReportData.filter((s) => s.status === "CANCELLED").length;
  const renewed = subscriptionReportData.filter((s) => s.status === "RENEWED").length;
  const expired = subscriptionReportData.filter((s) => s.status === "EXPIRED").length;
  const autoRenewCount = subscriptionReportData.filter((s) => s.autoRenew).length;
  const totalRevenue = subscriptionReportData.reduce((s, sub) => s + sub.amount, 0);

  return (
    <div>
      <PageHeader
        title="Subscription Report"
        description="Subscription metrics, renewals, and churn analysis."
        icon={Repeat}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Subscriptions" value={total} icon={Repeat} accent="left" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="left" />
        <StatCard label="Renewed" value={renewed} variant="default" icon={RefreshCw} accent="left" />
        <StatCard label="Churned" value={cancelled + expired} variant="danger" icon={XCircle} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ReportSubscriptionsSection data={subscriptionReportData} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <GlassCard
            icon={<Repeat className="size-5 text-primary" />}
            title="Subscription Revenue"
            value={`৳${totalRevenue.toLocaleString()}`}
            subtitle="Across all plans"
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Auto-Renew Enabled</span>
                <span className="text-sm font-bold text-success">{autoRenewCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Active</span>
                <span className="text-sm font-bold text-foreground">{active}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Churn Rate</span>
                <span className="text-sm font-bold text-destructive">
                  {total > 0 ? Math.round(((cancelled + expired) / total) * 100) : 0}%
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
