import type { WalletStatus } from "@/data/wallets";

interface WalletStatusBadgeProps {
  status: WalletStatus;
}

const statusConfig: Record<WalletStatus, { dot: string; ring: string; label: string }> = {
  COMPLETED: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Completed" },
  PENDING: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "Pending" },
  FAILED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Failed" },
  REVERSED: { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: "Reversed" },
};

export function WalletStatusBadge({ status }: WalletStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${config.ring}`}>
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
