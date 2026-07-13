import { TrendingUp, DollarSign, Landmark, AlertTriangle, Download } from "lucide-react";
import { revenueEntries } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportRevenueSection } from "@/components/dashboard/admin/reports/report-revenue-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function ReportsRevenuePage() {
  const total = revenueEntries.length;
  const totalAmount = revenueEntries.reduce((s, e) => s + e.amount, 0);
  const settled = revenueEntries.filter((e) => e.status === "SETTLED").reduce((s, e) => s + e.amount, 0);
  const disputed = revenueEntries.filter((e) => e.status === "DISPUTED").reduce((s, e) => s + e.amount, 0);
  const settledRate = totalAmount > 0 ? Math.round((settled / totalAmount) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="Revenue Report"
        description="Analyze platform revenue across all streams."
        icon={TrendingUp}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`৳${totalAmount.toLocaleString()}`} icon={DollarSign} accent="left" />
        <StatCard label="Settled" value={`৳${settled.toLocaleString()}`} variant="success" icon={Landmark} accent="left" />
        <StatCard label="Settlement Rate" value={`${settledRate}%`} variant={settledRate > 70 ? "success" : "warning"} icon={TrendingUp} accent="left" />
        <StatCard label="Disputed" value={`৳${disputed.toLocaleString()}`} variant="danger" icon={AlertTriangle} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ReportRevenueSection data={revenueEntries} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <GlassCard
            icon={<DollarSign className="size-5 text-success" />}
            iconBg="bg-success/10"
            title="Revenue by Source"
            value={`৳${totalAmount.toLocaleString()}`}
            subtitle="All sources combined"
          >
            <div className="mt-4 space-y-2">
              {(["PLATFORM_FEE", "DELIVERY_FEE", "COMMISSION", "SUBSCRIPTION", "ADVERTISING"] as const).map((src) => {
                const amt = revenueEntries.filter((e) => e.source === src).reduce((s, e) => s + e.amount, 0);
                const pct = totalAmount > 0 ? Math.round((amt / totalAmount) * 100) : 0;
                return (
                  <div key={src} className="flex items-center justify-between rounded-lg bg-muted p-2.5">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {src.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      ৳{amt.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
