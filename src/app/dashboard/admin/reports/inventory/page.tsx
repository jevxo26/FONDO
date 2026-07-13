import { Package } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsInventoryPage() {
  return (
    <div>
      <PageHeader
        title="Inventory Report"
        description="Kitchen inventory usage and stock reports."
        icon={Package}
      />
    </div>
  );
}
