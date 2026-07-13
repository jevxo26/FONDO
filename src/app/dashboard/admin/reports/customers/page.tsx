import { Users, Download } from "lucide-react";
import { customerReportData } from "@/data/reports";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportCustomersSection } from "@/components/dashboard/admin/reports/report-customers-section";
import { CustomerReportSummaryCards } from "@/components/dashboard/admin/reports/customer-report-summary-cards";
import { Button } from "@/components/ui/button";

export default function ReportsCustomersPage() {
  return (
    <div>
      <PageHeader title="Customer Report" description="Customer acquisition and retention reports." icon={Users}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>}
      />
      <div className="mt-8">
        <CustomerReportSummaryCards />
      </div>
      <div className="mt-8">
        <ReportCustomersSection data={customerReportData} />
      </div>
    </div>
  );
}
