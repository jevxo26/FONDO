import type { PaymentStatus, RefundStatus, SettlementStatus } from "@/data/payments";

interface PaymentStatusBadgeProps { status: PaymentStatus; }
interface RefundStatusBadgeProps { status: RefundStatus; }
interface SettlementStatusBadgeProps { status: SettlementStatus; }

const pConfig: Record<PaymentStatus, { dot: string; ring: string; label: string }> = {
  SUCCESS: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Success" },
  FAILED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Failed" },
  REFUNDED: { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: "Refunded" },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const c = pConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${c.ring}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />{c.label}
    </span>
  );
}

const rConfig: Record<RefundStatus, { dot: string; ring: string; label: string }> = {
  PENDING: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "Pending" },
  APPROVED: { dot: "bg-primary", ring: "bg-primary/10 text-primary ring-primary/20", label: "Approved" },
  PROCESSED: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Processed" },
  REJECTED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Rejected" },
};

export function RefundStatusBadge({ status }: RefundStatusBadgeProps) {
  const c = rConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${c.ring}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />{c.label}
    </span>
  );
}

const sConfig: Record<SettlementStatus, { dot: string; ring: string; label: string }> = {
  PENDING: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "Pending" },
  PROCESSING: { dot: "bg-primary", ring: "bg-primary/10 text-primary ring-primary/20", label: "Processing" },
  COMPLETED: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Completed" },
  FAILED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Failed" },
};

export function SettlementStatusBadge({ status }: SettlementStatusBadgeProps) {
  const c = sConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${c.ring}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />{c.label}
    </span>
  );
}
