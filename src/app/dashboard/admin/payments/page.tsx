import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PaymentTransactions } from "@/components/dashboard/admin/payments/payment-transactions";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="Monitor all payment transactions across the platform." icon={CreditCard} />
      <PaymentTransactions />
    </div>
  );
}
