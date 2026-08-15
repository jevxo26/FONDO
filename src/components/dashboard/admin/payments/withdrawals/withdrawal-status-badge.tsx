interface WithdrawalStatusBadgeProps {
  status: string;
}

const config: Record<string, { dot: string; ring: string; label: string }> = {
  pending: {
    dot: "bg-warning",
    ring: "bg-warning/10 text-warning ring-warning/20",
    label: "Pending",
  },
  approved: {
    dot: "bg-primary",
    ring: "bg-primary/10 text-primary ring-primary/20",
    label: "Approved",
  },
  rejected: {
    dot: "bg-destructive",
    ring: "bg-destructive/10 text-destructive ring-destructive/20",
    label: "Rejected",
  },
};

export function WithdrawalStatusBadge({ status }: WithdrawalStatusBadgeProps) {
  const c = config[status.toLowerCase()] ?? config.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${c.ring}`}
    >
      <span className={`size-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
