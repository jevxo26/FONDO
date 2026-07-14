import { BarChart3, TrendingUp, TrendingDown, Star, Medal, Trophy } from "lucide-react";
import { vendorPerformanceData } from "@/data/vendors";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PerformanceTableSection } from "@/components/dashboard/admin/vendors/performance/performance-table-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { DarkCard } from "@/components/dashboard/common/dark-card";

export default function VendorsPerformancePage() {
  const totalOrders = vendorPerformanceData.reduce((s, v) => s + v.orders, 0);
  const avgRating = (vendorPerformanceData.reduce((s, v) => s + v.rating, 0) / vendorPerformanceData.length).toFixed(1);
  const avgOnTime = Math.round(vendorPerformanceData.reduce((s, v) => s + v.onTimeRate, 0) / vendorPerformanceData.length);
  const totalComplaints = vendorPerformanceData.reduce((s, v) => s + v.complaints, 0);
  const topVendor = vendorPerformanceData.reduce((best, v) => (v.rating > best.rating ? v : best));
  const bestOnTime = vendorPerformanceData.reduce((best, v) => (v.onTimeRate > best.onTimeRate ? v : best));

  return (
    <div>
      <PageHeader
        title="Vendor Performance"
        description="Analyze vendor performance metrics and ratings."
        icon={TrendingUp}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. Vendor Rating" value={avgRating} icon={Star} accent="left" />
        <StatCard label="Total Orders" value={totalOrders.toLocaleString()} variant="success" icon={BarChart3} accent="left" />
        <StatCard label="On-Time Rate" value={`${avgOnTime}%`} variant="default" icon={TrendingUp} accent="left" />
        <StatCard label="Quality Alerts" value={totalComplaints} variant="danger" icon={TrendingDown} accent="left" />
      </div>
      <div className="mt-8">
        <PerformanceTableSection data={vendorPerformanceData} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard
          icon={<Trophy className="size-5 text-warning" />}
          iconBg="bg-warning/10"
          title="Top Rated"
          value={topVendor.name}
          subtitle={`${topVendor.rating.toFixed(1)} / 5.0 rating`}
          className="flex-1"
        >
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            {topVendor.orders.toLocaleString()} orders — {topVendor.onTimeRate}% on-time
          </div>
        </GlassCard>
        <DarkCard
          icon={<Medal className="size-40" />}
          title="Best On-Time"
          description={`${bestOnTime.onTimeRate}% delivery rate`}
          className="flex-1"
        >
          <div className="font-bold text-white">{bestOnTime.name}</div>
          <div className="mt-2 text-sm text-white/70">
            {bestOnTime.orders.toLocaleString()} orders with {bestOnTime.complaints} complaints
          </div>
        </DarkCard>
      </div>
    </div>
  );
}
