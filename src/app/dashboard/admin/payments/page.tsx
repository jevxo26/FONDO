import { CheckCircle, CreditCard, XCircle, Undo2, Banknote, Download, Plus } from "lucide-react";
import { transactions, refunds, settlements } from "@/data/payments";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PaymentSummaryCards } from "@/components/dashboard/admin/payments/transactions/payment-summary-cards";
import { PaymentTableSection } from "@/components/dashboard/admin/payments/transactions/payment-table-section";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  const total = transactions.length;
  const success = transactions.filter((t) => t.status === "SUCCESS").length;
  const failed = transactions.filter((t) => t.status === "FAILED").length;
  const refunded = transactions.filter((t) => t.status === "REFUNDED").length;

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Monitor all payment transactions across the platform."
        icon={CreditCard}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" /> Export CSV
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" /> Manual Refund
            </Button>
          </>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Transactions" value={total} icon={CreditCard} accent="right" />
        <StatCard label="Successful" value={success} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Failed" value={failed} variant="danger" icon={XCircle} accent="right" />
        <StatCard label="Refunded" value={refunded} variant="warning" icon={Undo2} accent="right" />
      </div>
      <div className="mt-8">
        <PaymentSummaryCards />
      </div>
      <div className="mt-8">
        <PaymentTableSection data={transactions} />
      </div>
    </div>
  );
}
