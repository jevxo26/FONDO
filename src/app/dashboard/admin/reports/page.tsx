import { BarChart3, Download } from "lucide-react";
import { salesEntries } from "@/data/reports";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportSalesSection } from "@/components/dashboard/admin/reports/report-sales-section";
import { ReportSummaryCards } from "@/components/dashboard/admin/reports/report-summary-cards";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Sales Report"
        description="View sales performance across all channels."
        icon={BarChart3}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export Report</Button>}
      />
      <div className="mt-8">
        <ReportSummaryCards />
      </div>
      <div className="mt-8">
        <ReportSalesSection data={salesEntries} />
      </div>
    </div>
  );
}
