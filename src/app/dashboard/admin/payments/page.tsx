import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function PaymentsPage() {
  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Monitor all payment transactions across the platform."
        icon={CreditCard}
      />
    </div>
  );
}
