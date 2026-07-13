import { Store, TrendingUp, DollarSign, Award, Download } from "lucide-react";
import { vendorReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportVendorsSection } from "@/components/dashboard/admin/reports/report-vendors-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function ReportsVendorsPage() {
  const total = vendorReportData.length;
  const active = vendorReportData.filter((v) => v.status === "ACTIVE").length;
  const totalRevenue = vendorReportData.reduce((s, v) => s + v.revenue, 0);
  const totalCommission = vendorReportData.reduce((s, v) => s + v.commission, 0);
  const topVendor = vendorReportData.reduce((best, v) => (v.revenue > best.revenue ? v : best));
  const avgRating = (vendorReportData.reduce((s, v) => s + v.rating, 0) / total).toFixed(1);
  const mostOrders = vendorReportData.reduce((best, v) => (v.totalOrders > best.totalOrders ? v : best));

  return (
    <div>
      <PageHeader title="Vendor Report" description="Vendor-specific sales and performance reports." icon={Store}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Vendors" value={total} icon={Store} accent="top" />
        <StatCard label="Active" value={active} variant="success" icon={TrendingUp} accent="top" />
        <StatCard label="Revenue" value={`৳${totalRevenue.toLocaleString()}`} icon={DollarSign} accent="top" />
        <StatCard label="Commission" value={`৳${totalCommission.toLocaleString()}`} variant="default" icon={Award} accent="top" />
      </div>
      <div className="mt-8">
        <ReportVendorsSection data={vendorReportData} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DarkCard icon={<Award className="size-40" />} title="Top Vendor" description={topVendor.vendorName}>
          <div className="font-fraunces text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">৳{topVendor.revenue.toLocaleString()}</div>
          <div className="mt-2 text-sm text-white/70">{topVendor.totalOrders} orders · {topVendor.rating} rating</div>
        </DarkCard>
        <GlassCard icon={<Award className="size-5 text-primary" />} title="Avg Rating" value={avgRating.toString()} subtitle="Across all vendors">
          <div className="mt-4 space-y-2">
            {vendorReportData.filter((v) => v.rating >= 4).slice(0, 3).map((v) => (
              <div key={v.id} className="flex justify-between text-xs"><span className="text-muted-foreground">{v.vendorName}</span><span className="font-bold">{v.rating}</span></div>
            ))}
          </div>
        </GlassCard>
        <GlassCard icon={<Store className="size-5 text-warning" />} iconBg="bg-warning/10" title="Most Orders" value={mostOrders.totalOrders.toString()} subtitle={mostOrders.vendorName}>
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Commission rate: ৳{mostOrders.commission.toLocaleString()} ({Math.round((mostOrders.commission / mostOrders.revenue) * 100)}%)
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
