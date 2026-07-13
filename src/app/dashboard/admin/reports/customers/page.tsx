import { Users, TrendingUp, UserCheck, UserX, Download } from "lucide-react";
import { customerReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportCustomersSection } from "@/components/dashboard/admin/reports/report-customers-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Button } from "@/components/ui/button";

export default function ReportsCustomersPage() {
  const total = customerReportData.length;
  const totalSpent = customerReportData.reduce((s, c) => s + c.totalSpent, 0);
  const active = customerReportData.filter((c) => c.segment === "ACTIVE").length;
  const churned = customerReportData.filter((c) => c.segment === "CHURNED").length;
  const atRisk = customerReportData.filter((c) => c.segment === "AT_RISK").length;
  const newCustomers = customerReportData.filter((c) => c.segment === "NEW").length;

  return (
    <div>
      <PageHeader
        title="Customer Report"
        description="Customer acquisition and retention reports."
        icon={Users}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Customers" value={total} icon={Users} accent="left" />
        <StatCard label="Active" value={active} variant="success" icon={UserCheck} accent="left" />
        <StatCard label="At Risk" value={atRisk} variant="warning" icon={TrendingUp} accent="left" />
        <StatCard label="Churned" value={churned} variant="danger" icon={UserX} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <ReportCustomersSection data={customerReportData} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DarkCard
            icon={<Users className="size-40" />}
            title="Segments"
            description={`${newCustomers} new, ${active} active, ${atRisk} at risk`}
          >
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/70">New</span>
                <span className="text-xs font-bold text-white">{newCustomers}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/70">Active</span>
                <span className="text-xs font-bold text-white">{active}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/70">At Risk</span>
                <span className="text-xs font-bold text-white">{atRisk}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/70">Churned</span>
                <span className="text-xs font-bold text-white">{churned}</span>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Total LTV</p>
              <p className="mt-1 text-base font-bold text-white">৳{totalSpent.toLocaleString()}</p>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
