import type { RiderStatus } from "@/data/riders";

const config: Record<RiderStatus, { dot: string; ring: string; label: string }> = {
  ACTIVE: { dot: "bg-success", ring: "bg-success/10 text-success ring-success/20", label: "Active" },
  BUSY: { dot: "bg-warning", ring: "bg-warning/10 text-warning ring-warning/20", label: "Busy" },
  OFFLINE: { dot: "bg-muted-foreground", ring: "bg-muted text-muted-foreground ring-border/40", label: "Offline" },
  ON_LEAVE: { dot: "bg-destructive", ring: "bg-destructive/10 text-destructive ring-destructive/20", label: "On Leave" },
};

export function RiderStatusBadge({ status }: { status: RiderStatus }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${c.ring}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />{c.label}
    </span>
  );
}
