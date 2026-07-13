import { Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportCustomers } from "@/components/dashboard/admin/reports/report-customers";

export default function ReportsCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Customer Report" description="Customer acquisition and retention reports." icon={Users} />
      <ReportCustomers />
    </div>
  );
}
