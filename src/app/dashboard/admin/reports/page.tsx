import { BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart } from "lucide-react";
import { salesEntries } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportSalesSection } from "@/components/dashboard/admin/reports/report-sales-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const total = salesEntries.length;
  const totalRevenue = salesEntries.reduce((s, e) => s + e.revenue, 0);
  const totalProfit = salesEntries.reduce((s, e) => s + e.profit, 0);
  const totalOrders = salesEntries.reduce((s, e) => s + e.orders, 0);
  const avgProfitMargin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="Sales Report"
        description="View sales performance across all channels."
        icon={BarChart3}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export Report
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`৳${totalRevenue.toLocaleString()}`} icon={DollarSign} accent="left" />
        <StatCard label="Total Orders" value={totalOrders} icon={ShoppingCart} accent="left" />
        <StatCard label="Profit Margin" value={`${avgProfitMargin}%`} variant={avgProfitMargin > 20 ? "success" : "warning"} icon={TrendingUp} accent="left" />
        <StatCard label="Total Entries" value={total} icon={BarChart3} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <ReportSalesSection data={salesEntries} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DarkCard
            icon={<TrendingUp className="size-40" />}
            title="Sales Summary"
            description={`${totalOrders} orders across ${total} entries`}
          >
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Online</p>
                <p className="mt-1 text-base font-bold text-white">
                  ৳{salesEntries.filter((e) => e.channel === "ONLINE").reduce((s, e) => s + e.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Dine-In</p>
                <p className="mt-1 text-base font-bold text-white">
                  ৳{salesEntries.filter((e) => e.channel === "DINE_IN").reduce((s, e) => s + e.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Catering</p>
                <p className="mt-1 text-base font-bold text-white">
                  ৳{salesEntries.filter((e) => e.channel === "CATERING").reduce((s, e) => s + e.revenue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
