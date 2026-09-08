import { StatusBadge, type statusBadgeVariants } from "@/components/common/status-badge";
import type { VariantProps } from "class-variance-authority";
import type { DeliveryStatus } from "@/data/riders";

const statusConfig: Record<DeliveryStatus, { label: string; variant: VariantProps<typeof statusBadgeVariants>["variant"] }> = {
  PENDING: { label: "Pending", variant: "muted" },
  ASSIGNED: { label: "Assigned", variant: "info" },
  ACCEPTED: { label: "Accepted", variant: "info" },
  PICKED_UP: { label: "Picked Up", variant: "warning" },
  ON_THE_WAY: { label: "On the Way", variant: "warning" },
  ARRIVED: { label: "Arrived", variant: "info" },
  DELIVERED: { label: "Delivered", variant: "success" },
  FAILED: { label: "Failed", variant: "danger" },
  CANCELLED: { label: "Cancelled", variant: "muted" },
};

export function DeliveryStatusBadge({ status }: { status: DeliveryStatus }) {
  const cfg = statusConfig[status] ?? { label: status, variant: "muted" as const };
  return <StatusBadge variant={cfg.variant}>{cfg.label}</StatusBadge>;
}