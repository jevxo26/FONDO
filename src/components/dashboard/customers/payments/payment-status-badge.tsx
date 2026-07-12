import type { PaymentStatus } from "@/data/payments";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig: Record<PaymentStatus, { dot: string; ring: string; label: string }> = {
  SUCCESS: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Success" },
  FAILED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Failed" },
  REFUNDED: { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: "Refunded" },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${config.ring}`}>
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
