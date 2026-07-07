import type { PaymentStatus } from "@/data/payments";
import { Badge } from "@/components/ui/badge";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig: Record<PaymentStatus, { dot: string; bg: string; label: string }> = {
  SUCCESS: { dot: "bg-status-green", bg: "bg-status-green/10 text-status-green", label: "Success" },
  FAILED: { dot: "bg-status-red", bg: "bg-status-red/10 text-status-red", label: "Failed" },
  REFUNDED: { dot: "bg-outline", bg: "bg-outline-variant text-on-surface-variant", label: "Refunded" },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={`flex w-fit items-center gap-1.5 rounded-full border-0 px-3 py-1 text-xs font-bold ${config.bg}`}>
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </Badge>
  );
}
