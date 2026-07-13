import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportRevenue } from "@/components/dashboard/admin/reports/report-revenue";

export default function ReportsRevenuePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Report" description="Analyze platform revenue across all streams." icon={TrendingUp} />
      <ReportRevenue />
    </div>
  );
}
