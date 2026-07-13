import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportSales } from "@/components/dashboard/admin/reports/report-sales";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sales Report" description="View sales performance across all channels." icon={BarChart3} />
      <ReportSales />
    </div>
  );
}
