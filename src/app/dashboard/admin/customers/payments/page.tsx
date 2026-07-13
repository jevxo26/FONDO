import { CreditCard, Download, Plus } from "lucide-react";
import { transactions } from "@/data/payments";
import { PaymentSummaryCards } from "@/components/dashboard/customers/payments/payment-summary-cards";
import { PaymentTableSection } from "@/components/dashboard/customers/payments/payment-table-section";
import { PaymentInsightCards } from "@/components/dashboard/customers/payments/payment-insight-cards";
import { PageHeader } from "@/components/dashboard/common/page-header";

import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  return (
    <div>
      <PageHeader
        title="Financial Overview"
        description="Track and manage every financial interaction across the ecosystem."
        icon={CreditCard}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export CSV
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" />
              Manual Refund
            </Button>
          </>
        }
      />
      <div className="mt-8">
        <PaymentSummaryCards />
      </div>
      <div className="mt-8">
        <PaymentTableSection data={transactions} />
      </div>
      <PaymentInsightCards />
    </div>
  );
}
