import { Package } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportInventory } from "@/components/dashboard/admin/reports/report-inventory";

export default function ReportsInventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inventory Report" description="Kitchen inventory usage and stock reports." icon={Package} />
      <ReportInventory />
    </div>
  );
}
