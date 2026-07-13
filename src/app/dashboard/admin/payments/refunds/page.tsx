import { Undo2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PaymentRefunds } from "@/components/dashboard/admin/payments/payment-refunds";

export default function PaymentsRefundsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Refunds" description="Process and track customer refund requests." icon={Undo2} />
      <PaymentRefunds />
    </div>
  );
}
