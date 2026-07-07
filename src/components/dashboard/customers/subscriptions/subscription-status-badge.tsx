"use client";

import type { SubscriptionStatus } from "@/data/subscriptions";
import { Badge } from "@/components/ui/badge";

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

const statusStyles: Record<SubscriptionStatus, string> = {
  PENDING: "border-amber-200 bg-amber-100 text-amber-800",
  ACTIVE: "border-green-200 bg-green-100 text-green-800",
  PAUSED: "border-blue-200 bg-blue-100 text-blue-800",
  FROZEN: "border-gray-200 bg-gray-100 text-gray-800",
  COMPLETED: "border-emerald-200 bg-emerald-100 text-emerald-800",
  EXPIRED: "border-red-200 bg-red-100 text-red-800",
  CANCELLED: "border-red-200 bg-red-100 text-red-800",
};

export function SubscriptionStatusBadge({
  status,
}: SubscriptionStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${statusStyles[status]}`}
    >
      {status}
    </Badge>
  );
}
