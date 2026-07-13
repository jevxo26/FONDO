import { Truck, TrendingUp, Award, AlertTriangle, Download } from "lucide-react";
import { riderReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportRidersSection } from "@/components/dashboard/admin/reports/report-riders-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function ReportsRidersPage() {
  const total = riderReportData.length;
  const totalDeliveries = riderReportData.reduce((s, r) => s + r.deliveries, 0);
  const totalLate = riderReportData.reduce((s, r) => s + r.late, 0);
  const totalEarnings = riderReportData.reduce((s, r) => s + r.earnings, 0);
  const onTimeRate = totalDeliveries > 0 ? Math.round(((totalDeliveries - totalLate) / totalDeliveries) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="Rider Report"
        description="Rider delivery and earnings reports."
        icon={Truck}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Riders" value={total} icon={Truck} accent="left" />
        <StatCard label="Total Deliveries" value={totalDeliveries} icon={TrendingUp} accent="left" />
        <StatCard label="On-Time Rate" value={`${onTimeRate}%`} variant={onTimeRate > 90 ? "success" : "warning"} icon={Award} accent="left" />
        <StatCard label="Late Deliveries" value={totalLate} variant="danger" icon={AlertTriangle} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ReportRidersSection data={riderReportData} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <GlassCard
            icon={<Truck className="size-5 text-primary" />}
            title="Delivery Stats"
            value={`${totalDeliveries} deliveries`}
            subtitle={`${onTimeRate}% on-time rate`}
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">On-Time</span>
                <span className="text-sm font-bold text-success">{totalDeliveries - totalLate}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Late</span>
                <span className="text-sm font-bold text-destructive">{totalLate}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Total Earnings</span>
                <span className="text-sm font-bold text-foreground">৳{totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
