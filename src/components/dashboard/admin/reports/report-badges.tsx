import type { SalesChannel } from "@/data/reports";

const channelConfig: Record<SalesChannel, { bg: string; label: string }> = {
  ONLINE: { bg: "bg-primary/10 text-primary ring-primary/20", label: "Online" },
  DINE_IN: { bg: "bg-success/10 text-success ring-success/20", label: "Dine-In" },
  CATERING: { bg: "bg-warning/10 text-warning ring-warning/20", label: "Catering" },
};

export function ChannelBadge({ channel }: { channel: SalesChannel }) {
  const c = channelConfig[channel];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 ${c.bg}`}>
      {c.label}
    </span>
  );
}

type StatusDotProps = {
  status: string;
  def?: string;
  success?: string;
  warning?: string;
  danger?: string;
  muted?: string;
};

const defaultDot: Record<string, { dot: string; ring: string; label: string }> = {
  COMPLETED: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Completed" },
  PENDING: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "Pending" },
  CANCELLED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Cancelled" },
  SETTLED: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Settled" },
  DISPUTED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Disputed" },
  ACTIVE: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Active" },
  SUSPENDED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Suspended" },
  INACTIVE: { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: "Inactive" },
  EXPIRED: { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: "Expired" },
  CHURNED: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Churned" },
  NEW: { dot: "bg-primary", ring: "bg-primary/10 text-primary ring-primary/20", label: "New" },
  AT_RISK: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "At Risk" },
  RENEWED: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Renewed" },
  IN_STOCK: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "In Stock" },
  LOW_STOCK: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "Low Stock" },
  OUT_OF_STOCK: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "Out of Stock" },
  OVERSTOCKED: { dot: "bg-primary", ring: "bg-primary/10 text-primary ring-primary/20", label: "Overstocked" },
};

export function StatusDotBadge({ status }: { status: string }) {
  const c = defaultDot[status] || { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${c.ring}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />{c.label}
    </span>
  );
}
