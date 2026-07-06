"use client";

import type { SubscriptionStatus } from "@/data/subscriptions";
import { cn } from "@/lib/utils";

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

const statusStyles: Record<SubscriptionStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  ACTIVE: "bg-green-100 text-green-800 border-green-200",
  PAUSED: "bg-blue-100 text-blue-800 border-blue-200",
  FROZEN: "bg-gray-100 text-gray-800 border-gray-200",
  COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  EXPIRED: "bg-red-100 text-red-800 border-red-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export function SubscriptionStatusBadge({
  status,
}: SubscriptionStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
