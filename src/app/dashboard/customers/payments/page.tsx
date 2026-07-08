import { Download, Plus } from "lucide-react";
import { transactions } from "@/data/payments";
import { PaymentSummaryCards } from "@/components/dashboard/customers/payments/payment-summary-cards";
import { PaymentTableSection } from "@/components/dashboard/customers/payments/payment-table-section";
import { PaymentInsightCards } from "@/components/dashboard/customers/payments/payment-insight-cards";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Financial Overview
          </h2>
          <p className="mt-2 text-muted-foreground">
            Track and manage every financial interaction across the ecosystem.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" />
            Export CSV
          </Button>
          <Button className="rounded-full">
            <Plus className="size-[18px]" />
            Manual Refund
          </Button>
        </div>
      </div>

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
