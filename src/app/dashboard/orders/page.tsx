import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function OrdersPage() {
  return (
    <div>
      <PageHeader
        title="Pending Orders"
        description="Orders awaiting confirmation and processing."
        icon={Receipt}
      />
    </div>
  );
}
