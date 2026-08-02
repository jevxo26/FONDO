"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePaymentDetail } from "@/store/api/slices/admin-payments-api";
import { Badge } from "@/components/ui/badge";

const statusBadgeMap: Record<string, { label: string; className: string }> = {
  COMPLETED: { label: "Completed", className: "bg-success/10 text-success ring-success/20" },
  PENDING: { label: "Pending", className: "bg-warning/10 text-warning ring-warning/20" },
  PROCESSING: { label: "Processing", className: "bg-primary/10 text-primary ring-primary/20" },
  FAILED: { label: "Failed", className: "bg-destructive/10 text-destructive ring-destructive/20" },
  CANCELLED: { label: "Cancelled", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  REFUNDED: { label: "Refunded", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  PARTIALLY_REFUNDED: { label: "Partial Refund", className: "bg-warning/10 text-warning ring-warning/20" },
};

function StatusBadge({ status }: { status: string }) {
  const badge = statusBadgeMap[status] ?? statusBadgeMap.PENDING;
  return <Badge variant="outline" className={`ring-1 ${badge.className}`}>{badge.label}</Badge>;
}

interface PaymentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId: string | null;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-1.5 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

export function PaymentDetailDialog({
  open,
  onOpenChange,
  paymentId,
}: PaymentDetailDialogProps) {
  const { data: detail, isLoading } = usePaymentDetail(paymentId ?? "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Payment Detail</DialogTitle>
          <DialogDescription>
            {detail?.paymentNumber ?? "Loading..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && <p className="py-6 text-sm text-muted-foreground">Loading payment...</p>}

        {!isLoading && detail && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Overview</h4>
              <Row label="Order" value={detail.order?.orderNumber ?? detail.orderId} />
              <Row label="Amount" value={`৳${Number(detail.amount).toLocaleString()} ${detail.currency}`} />
              <Row label="Status" value={<StatusBadge status={detail.status} />} />
              {detail.paymentDate && (
                <Row label="Paid At" value={new Date(detail.paymentDate).toLocaleString()} />
              )}
              {detail.failureReason && <Row label="Failure" value={detail.failureReason} />}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Transactions</h4>
              {detail.transactions.length === 0 && (
                <p className="text-sm text-muted-foreground">No transactions.</p>
              )}
              {detail.transactions.map((tx) => (
                <Row
                  key={tx.id}
                  label={`${tx.transactionType ?? "txn"} · ${tx.status ?? ""}`}
                  value={`৳${Number(tx.amount).toLocaleString()}`}
                />
              ))}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Refunds</h4>
              {detail.refunds.length === 0 && (
                <p className="text-sm text-muted-foreground">No refunds.</p>
              )}
              {detail.refunds.map((r) => (
                <Row key={r.id} label={`${r.status} · ${r.reason}`} value={`৳${Number(r.refundAmount).toLocaleString()}`} />
              ))}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Adjustments</h4>
              {detail.adjustments.length === 0 && (
                <p className="text-sm text-muted-foreground">No adjustments.</p>
              )}
              {detail.adjustments.map((a) => (
                <Row key={a.id} label={`${a.adjustmentType} · ${a.reason}`} value={`৳${Number(a.amount).toLocaleString()}`} />
              ))}
            </div>

            {detail.invoice && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Invoice</h4>
                <Row label="Number" value={detail.invoice.invoiceNumber} />
                <Row label="Grand Total" value={`৳${Number(detail.invoice.grandTotal).toLocaleString()}`} />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
