import { cn } from "@/lib/utils";
import type { DeliveryStatus } from "@/data/riders";

const statusConfig: Record<DeliveryStatus, { label: string; class: string }> = {
  PENDING: { label: "Pending", class: "bg-muted text-muted-foreground" },
  ASSIGNED: { label: "Assigned", class: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  ACCEPTED: { label: "Accepted", class: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" },
  PICKED_UP: { label: "Picked Up", class: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  ON_THE_WAY: { label: "On the Way", class: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  ARRIVED: { label: "Arrived", class: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  DELIVERED: { label: "Delivered", class: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  FAILED: { label: "Failed", class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  CANCELLED: { label: "Cancelled", class: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" },
};

export function DeliveryStatusBadge({ status }: { status: DeliveryStatus }) {
  const cfg = statusConfig[status] ?? { label: status, class: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", cfg.class)}>
      {cfg.label}
    </span>
  );
}
