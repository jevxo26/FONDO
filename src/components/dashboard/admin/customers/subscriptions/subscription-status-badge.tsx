import type { SubscriptionStatus } from "@/data/subscriptions";

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

const statusStyles: Record<SubscriptionStatus, string> = {
  PENDING: "bg-warning/10 text-warning ring-warning/20",
  ACTIVE: "bg-success/10 text-success ring-success/20",
  PAUSED: "bg-primary/10 text-primary ring-primary/20",
  FROZEN: "bg-muted text-muted-foreground ring-border/40",
  COMPLETED: "bg-success/10 text-success ring-success/20",
  EXPIRED: "bg-destructive/10 text-destructive ring-destructive/20",
  CANCELLED: "bg-destructive/10 text-destructive ring-destructive/20",
};

export function SubscriptionStatusBadge({ status }: SubscriptionStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
