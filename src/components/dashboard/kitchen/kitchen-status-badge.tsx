import { cn } from "@/lib/utils";
import type { KitchenOrderStatus } from "@/data/kitchen";

const statusConfig: Record<KitchenOrderStatus, { label: string; class: string }> = {
  QUEUED: { label: "Queued", class: "bg-warning/10 text-warning ring-warning/20" },
  PREPARING: { label: "Preparing", class: "bg-primary/10 text-primary ring-primary/20" },
  READY: { label: "Ready", class: "bg-success/10 text-success ring-success/20" },
  PACKED: { label: "Packed", class: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
};

export function KitchenStatusBadge({ status }: { status: KitchenOrderStatus }) {
  const cfg = statusConfig[status] ?? { label: status, class: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1", cfg.class)}>
      {cfg.label}
    </span>
  );
}
