import { Store } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportVendors } from "@/components/dashboard/admin/reports/report-vendors";

export default function ReportsVendorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Vendor Report" description="Vendor-specific sales and performance reports." icon={Store} />
      <ReportVendors />
    </div>
  );
}
