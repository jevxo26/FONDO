import { XCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function OrdersCancelledPage() {
  return (
    <div>
      <PageHeader
        title="Cancelled Orders"
        description="Orders that were cancelled or refunded."
        icon={XCircle}
      />
    </div>
  );
}
