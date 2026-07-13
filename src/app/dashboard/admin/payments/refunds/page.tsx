import { Undo2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function PaymentsRefundsPage() {
  return (
    <div>
      <PageHeader
        title="Refunds"
        description="Process and track customer refund requests."
        icon={Undo2}
      />
    </div>
  );
}
