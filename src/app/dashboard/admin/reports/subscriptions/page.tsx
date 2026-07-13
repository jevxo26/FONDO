import { Repeat } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsSubscriptionsPage() {
  return (
    <div>
      <PageHeader
        title="Subscription Report"
        description="Subscription metrics, renewals, and churn analysis."
        icon={Repeat}
      />
    </div>
  );
}
