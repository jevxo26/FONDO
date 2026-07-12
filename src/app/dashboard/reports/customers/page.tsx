import { Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsCustomersPage() {
  return (
    <div>
      <PageHeader
        title="Customer Report"
        description="Customer acquisition and retention reports."
        icon={Users}
      />
    </div>
  );
}
