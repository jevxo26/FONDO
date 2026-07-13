import { Store } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsVendorsPage() {
  return (
    <div>
      <PageHeader
        title="Vendor Report"
        description="Vendor-specific sales and performance reports."
        icon={Store}
      />
    </div>
  );
}
