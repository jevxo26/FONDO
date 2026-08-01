"use client";

import { useState } from "react";
import { Undo2, Wallet as WalletIcon, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { RefundTableSection } from "@/components/dashboard/admin/payments/refunds/refund-table-section";
import { RefundDialog } from "@/components/dashboard/admin/payments/refunds/refund-dialog";
import { useAllPayments, useRefundPayment } from "@/store/api/slices/admin-payments-api";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";
import type { Payment } from "@/types/payment";

export default function PaymentsRefundsPage() {
  const { data: payments, isLoading } = useAllPayments();
  const refund = useRefundPayment();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const refundable = (payments ?? []).filter((p) => ["COMPLETED", "PROCESSING"].includes(p.status));
  const totalAmount = refundable.reduce((s, p) => s + Number(p.amount), 0);

  const openRefund = (payment: Payment) => {
    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const handleRefund = (paymentId: string, amount: number, reason: string) => {
    refund.mutate(
      { paymentId, amount, reason },
      {
        onSuccess: () => {
          toast.success("Refund processed");
          setDialogOpen(false);
          setSelectedPayment(null);
        },
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return (
    <div>
      <PageHeader title="Refunds" description="Process and track customer refund requests." icon={Undo2} />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Refundable Payments" value={refundable.length} icon={Undo2} accent="right" />
        <StatCard label="Refundable Amount" value={`৳${totalAmount.toLocaleString()}`} icon={WalletIcon} variant="warning" accent="right" />
        <StatCard label="Total Payments" value={(payments ?? []).length} icon={Undo2} accent="right" />
      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]">
        <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Payments Eligible for Refund</h2>
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="size-8 animate-spin text-primary" /></div>
        ) : (
          <RefundTableSection data={refundable} onOpenRefund={openRefund} />
        )}
      </div>

      <RefundDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        payment={selectedPayment}
        onRefund={handleRefund}
        isPending={refund.isPending}
      />
    </div>
  );
}
