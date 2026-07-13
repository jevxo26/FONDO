import { CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function OrdersConfirmedPage() {
  return (
    <div>
      <PageHeader
        title="Confirmed Orders"
        description="Orders confirmed and queued for preparation."
        icon={CheckCircle}
      />
    </div>
  );
}
