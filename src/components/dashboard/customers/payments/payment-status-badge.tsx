import type { PaymentStatus } from "@/data/payments";
import { Badge } from "@/components/ui/badge";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig: Record<PaymentStatus, { dot: string; bg: string; label: string }> = {
  SUCCESS: { dot: "bg-success", bg: "bg-success/10 text-success", label: "Success" },
  FAILED: { dot: "bg-destructive", bg: "bg-destructive/10 text-destructive", label: "Failed" },
  REFUNDED: { dot: "bg-muted-foreground", bg: "bg-muted text-muted-foreground", label: "Refunded" },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={`flex w-fit items-center gap-1.5 rounded-full border-0 px-3 py-1 text-xs font-bold ${config.bg}`}
    >
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </Badge>
  );
}
