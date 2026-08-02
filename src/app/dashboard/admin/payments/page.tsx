"use client";

import { useState } from "react";
import { CheckCircle, CreditCard, XCircle, Undo2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PaymentTableSection } from "@/components/dashboard/admin/payments/transactions/payment-table-section";
import { PaymentDetailDialog } from "@/components/dashboard/admin/payments/transactions/payment-detail-dialog";
import { AdjustPaymentDialog } from "@/components/dashboard/admin/payments/transactions/adjust-payment-dialog";
import { useAllPayments } from "@/store/api/slices/admin-payments-api";
import type { Payment } from "@/types/payment";

const COMPLETED = "COMPLETED";
const FAILED = "FAILED";
const REFUNDED = "REFUNDED";

export default function PaymentsPage() {
  const { data: payments, isLoading } = useAllPayments();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [adjustTarget, setAdjustTarget] = useState<Payment | null>(null);
  const all = payments ?? [];

  const total = all.length;
  const success = all.filter((t) => t.status === COMPLETED).length;
  const failed = all.filter((t) => t.status === FAILED).length;
  const refunded = all.filter((t) => t.status === REFUNDED).length;

  return (
    <div>
      <PageHeader title="Transactions" description="Monitor all payment transactions across the platform." icon={CreditCard} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Payments" value={total} icon={CreditCard} accent="right" />
        <StatCard label="Completed" value={success} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Failed" value={failed} variant="danger" icon={XCircle} accent="right" />
        <StatCard label="Refunded" value={refunded} variant="warning" icon={Undo2} accent="right" />
      </div>
      <div className="mt-8">
        <PaymentTableSection
          data={all}
          isLoading={isLoading}
          onView={(p) => setDetailId(p.id)}
          onAdjust={(p) => setAdjustTarget(p)}
        />
      </div>

      <PaymentDetailDialog
        open={!!detailId}
        onOpenChange={(open) => !open && setDetailId(null)}
        paymentId={detailId}
      />

      <AdjustPaymentDialog
        open={!!adjustTarget}
        onOpenChange={(open) => !open && setAdjustTarget(null)}
        payment={adjustTarget}
      />
    </div>
  );
}
