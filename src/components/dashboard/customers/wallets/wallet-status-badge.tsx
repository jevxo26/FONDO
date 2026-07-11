import type { WalletStatus } from "@/data/wallets";
import { Badge } from "@/components/ui/badge";

interface WalletStatusBadgeProps {
  status: WalletStatus;
}

const statusConfig: Record<WalletStatus, { dot: string; bg: string; label: string }> = {
  COMPLETED: { dot: "bg-success", bg: "bg-success/10 text-success", label: "Completed" },
  PENDING: { dot: "bg-chart-4", bg: "bg-secondary/80 text-muted-foreground", label: "Pending" },
  FAILED: { dot: "bg-destructive", bg: "bg-destructive/10 text-destructive", label: "Failed" },
  REVERSED: { dot: "bg-border", bg: "bg-muted text-muted-foreground", label: "Reversed" },
};

export function WalletStatusBadge({ status }: WalletStatusBadgeProps) {
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
