import { Download, Plus } from 'lucide-react';
import { transactions } from '@/data/payments';
import { PaymentSummaryCards } from '@/components/dashboard/customers/payments/payment-summary-cards';
import { PaymentTableSection } from '@/components/dashboard/customers/payments/payment-table-section';
import { PaymentInsightCards } from '@/components/dashboard/customers/payments/payment-insight-cards';

export default function PaymentsPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Financial Overview</h2>
          <p className="mt-2 text-muted-foreground">
            Track and manage every financial interaction across the ecosystem.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-foreground px-6 py-2.5 text-[11px] font-bold text-foreground transition-all hover:bg-foreground hover:text-white">
            <Download className="size-[18px]" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[11px] font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-95">
            <Plus className="size-[18px]" />
            Manual Refund
          </button>
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
