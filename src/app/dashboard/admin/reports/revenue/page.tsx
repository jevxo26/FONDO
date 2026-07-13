import { TrendingUp, Download } from "lucide-react";
import { revenueEntries } from "@/data/reports";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportRevenueSection } from "@/components/dashboard/admin/reports/report-revenue-section";
import { RevenueSummaryCards } from "@/components/dashboard/admin/reports/revenue-summary-cards";
import { Button } from "@/components/ui/button";

export default function ReportsRevenuePage() {
  return (
    <div>
      <PageHeader title="Revenue Report" description="Analyze platform revenue across all streams." icon={TrendingUp}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>}
      />
      <div className="mt-8">
        <RevenueSummaryCards />
      </div>
      <div className="mt-8">
        <ReportRevenueSection data={revenueEntries} />
      </div>
    </div>
  );
}
