import { Store, TrendingUp, DollarSign, Award, Download } from "lucide-react";
import { vendorReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportVendorsSection } from "@/components/dashboard/admin/reports/report-vendors-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Button } from "@/components/ui/button";

export default function ReportsVendorsPage() {
  const total = vendorReportData.length;
  const active = vendorReportData.filter((v) => v.status === "ACTIVE").length;
  const totalRevenue = vendorReportData.reduce((s, v) => s + v.revenue, 0);
  const totalCommission = vendorReportData.reduce((s, v) => s + v.commission, 0);
  const topVendor = vendorReportData.reduce((best, v) => (v.revenue > best.revenue ? v : best));

  return (
    <div>
      <PageHeader
        title="Vendor Report"
        description="Vendor-specific sales and performance reports."
        icon={Store}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Vendors" value={total} icon={Store} accent="left" />
        <StatCard label="Active" value={active} variant="success" icon={TrendingUp} accent="left" />
        <StatCard label="Revenue" value={`৳${totalRevenue.toLocaleString()}`} icon={DollarSign} accent="left" />
        <StatCard label="Commission" value={`৳${totalCommission.toLocaleString()}`} variant="default" icon={Award} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <ReportVendorsSection data={vendorReportData} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DarkCard
            icon={<Award className="size-40" />}
            title="Top Vendor"
            description={topVendor.vendorName}
          >
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Revenue</p>
                <p className="mt-1 text-base font-bold text-white">৳{topVendor.revenue.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Orders</p>
                <p className="mt-1 text-base font-bold text-white">{topVendor.totalOrders}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Rating</p>
                <p className="mt-1 text-base font-bold text-white">{topVendor.rating}</p>
              </div>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
