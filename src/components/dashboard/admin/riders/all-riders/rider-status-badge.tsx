"use client";

import { RiderStatus } from "@/store/api/slices/rider-api";


interface RiderStatusBadgeProps {
  status: RiderStatus | string;
}

const statusConfig: Record<
  string,
  { label: string; className: string; ring: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-warning/10 text-warning border-warning/20",
    ring: "bg-warning",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/20",
    ring: "bg-success",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    ring: "bg-destructive",
  },
  SUSPENDED: {
    label: "Suspended",
    className: "bg-muted text-muted-foreground border-border",
    ring: "bg-muted-foreground",
  },
};

// Fallback configuration if status is undefined or unknown
const defaultConfig = {
  label: "Unknown",
  className: "bg-muted text-muted-foreground border-border",
  ring: "bg-muted-foreground",
};

export function RiderStatusBadge({ status }: RiderStatusBadgeProps) {
  // Safe lookup with fallback
  const config = statusConfig[status] || defaultConfig;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      <span className={`size-1.5 rounded-full ${config.ring}`} />
      {config.label}
    </span>
  );
}