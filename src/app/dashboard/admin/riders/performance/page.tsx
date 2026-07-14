import { BarChart3, TrendingUp, TrendingDown, Award, Medal } from "lucide-react";
import { riderPerformanceData } from "@/data/riders";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderPerformanceSection } from "@/components/dashboard/admin/riders/performance/rider-performance-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export default function RidersPerformancePage() {
  const totalDeliveries = riderPerformanceData.reduce((s, r) => s + r.deliveriesThisWeek, 0);
  const avgOnTime = Math.round(riderPerformanceData.reduce((s, r) => s + r.onTimeRate, 0) / riderPerformanceData.length);
  const avgRating = (riderPerformanceData.reduce((s, r) => s + r.avgRating, 0) / riderPerformanceData.length).toFixed(1);
  const totalComplaints = riderPerformanceData.reduce((s, r) => s + r.complaints, 0);
  const topRider = riderPerformanceData.reduce((best, r) => (r.deliveriesThisWeek > best.deliveriesThisWeek ? r : best));

  return (
    <div>
      <PageHeader title="Performance" description="Analyze rider delivery performance and ratings." icon={BarChart3} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Deliveries" value={totalDeliveries} icon={BarChart3} accent="left" />
        <StatCard label="On-Time Rate" value={`${avgOnTime}%`} variant="success" icon={TrendingUp} accent="left" />
        <StatCard label="Avg Rating" value={avgRating} variant="default" icon={Award} accent="left" />
        <StatCard label="Complaints" value={totalComplaints} variant="danger" icon={TrendingDown} accent="left" />
      </div>
      <div className="mt-8">
        <RiderPerformanceSection data={riderPerformanceData} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassCard icon={<BarChart3 className="size-5 text-primary" />} title="Weekly Volume" value={totalDeliveries.toString()} subtitle="Across all riders">
          <div className="mt-4 text-xs text-muted-foreground">Avg {(totalDeliveries / riderPerformanceData.length).toFixed(0)} deliveries per rider</div>
        </GlassCard>
        <GlassCard icon={<TrendingUp className="size-5 text-success" />} iconBg="bg-success/10" title="Best On-Time" value={`${topRider.onTimeRate}%`} subtitle={topRider.name}>
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">{topRider.deliveriesThisWeek} deliveries this week with {topRider.lateDeliveries} late</div>
        </GlassCard>
        <GlassCard icon={<Award className="size-5 text-warning" />} iconBg="bg-warning/10" title="Complaint Rate" value={`${((totalComplaints / totalDeliveries) * 100).toFixed(1)}%`} subtitle="Of total deliveries">
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">{totalComplaints} complaints out of {totalDeliveries} deliveries</div>
        </GlassCard>
      </div>
    </div>
  );
}
