import { Truck, TrendingUp, Award, AlertTriangle, Download, DollarSign } from "lucide-react";
import { riderReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportRidersSection } from "@/components/dashboard/admin/reports/report-riders-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function ReportsRidersPage() {
  const total = riderReportData.length;
  const totalDeliveries = riderReportData.reduce((s, r) => s + r.deliveries, 0);
  const totalLate = riderReportData.reduce((s, r) => s + r.late, 0);
  const totalEarnings = riderReportData.reduce((s, r) => s + r.earnings, 0);
  const onTimeRate = totalDeliveries > 0 ? Math.round(((totalDeliveries - totalLate) / totalDeliveries) * 100) : 0;
  const avgEarnings = Math.round(totalEarnings / total);
  const topRider = [...riderReportData].sort((a, b) => b.deliveries - a.deliveries)[0];

  return (
    <div>
      <PageHeader title="Rider Report" description="Rider delivery and earnings reports." icon={Truck}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Riders" value={total} icon={Truck} accent="right" />
        <StatCard label="Total Deliveries" value={totalDeliveries} icon={TrendingUp} accent="right" />
        <StatCard label="On-Time Rate" value={`${onTimeRate}%`} variant={onTimeRate > 90 ? "success" : "warning"} icon={Award} accent="right" />
        <StatCard label="Late Deliveries" value={totalLate} variant="danger" icon={AlertTriangle} accent="right" />
      </div>
      <div className="mt-8">
        <ReportRidersSection data={riderReportData} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        <GlassCard icon={<TrendingUp className="size-5 text-success" />} iconBg="bg-success/10" title="On-Time Rate" value={`${onTimeRate}%`} subtitle="Platform average">
          <div className="mt-4 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-success" style={{ width: `${onTimeRate}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{(totalDeliveries - totalLate).toLocaleString()} on-time</span>
            <span>{totalLate} late</span>
          </div>
        </GlassCard>
        <DarkCard icon={<DollarSign className="size-40" />} title="Avg Earnings" description="Per rider">
          <div className="font-fraunces text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">৳{avgEarnings.toLocaleString()}</div>
          <div className="mt-2 text-sm text-white/70">Total: ৳{totalEarnings.toLocaleString()}</div>
        </DarkCard>
        <GlassCard icon={<Award className="size-5 text-warning" />} iconBg="bg-warning/10" title="Top Rider" value={topRider.riderName} subtitle={`${topRider.deliveries} deliveries`}>
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            {topRider.onTime} on-time · {topRider.late} late · {topRider.rating} rating
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
