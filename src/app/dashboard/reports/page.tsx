import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Sales Report"
        description="View sales performance across all channels."
        icon={BarChart3}
      />
    </div>
  );
}
