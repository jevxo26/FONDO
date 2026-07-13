import { CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function OrdersCompletedPage() {
  return (
    <div>
      <PageHeader
        title="Completed Orders"
        description="Orders successfully delivered to customers."
        icon={CheckCircle}
      />
    </div>
  );
}
