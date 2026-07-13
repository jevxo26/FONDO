import { ArrowLeftRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PaymentSettlements } from "@/components/dashboard/admin/payments/payment-settlements";

export default function PaymentsSettlementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settlements" description="Manage platform-wide payment settlements." icon={ArrowLeftRight} />
      <PaymentSettlements />
    </div>
  );
}
