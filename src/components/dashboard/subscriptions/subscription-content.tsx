import { DataTable } from "@/components/common/table";
import { subscriptionColumns } from "@/components/dashboard/subscriptions/subscription-columns";
import { SubscriptionContextCards } from "@/components/dashboard/subscriptions/subscription-context-cards";
import { subscriptions } from "@/data/subscriptions";

interface SubscriptionContentProps {
  statusFilter?: string;
}

export function SubscriptionContent({ statusFilter }: SubscriptionContentProps) {
  const filtered = statusFilter
    ? subscriptions.filter((s) => s.status.toLowerCase() === statusFilter)
    : subscriptions;

  const total = filtered.length;
  const active = filtered.filter((s) => s.status === "ACTIVE").length;
  const paused = filtered.filter((s) => s.status === "PAUSED").length;
  const expired = filtered.filter((s) => s.status === "EXPIRED" || s.status === "CANCELLED").length;

  return (
    <div>
      <div className="mt-8 grid grid-cols-4 gap-6">
        <StatCard label="Total Subscriptions" value={total} />
        <StatCard label="Active" value={active} />
        <StatCard label="Paused" value={paused} />
        <StatCard label="Expired / Cancelled" value={expired} />
      </div>

      <div className="mt-6">
        <DataTable columns={subscriptionColumns} data={filtered} />
      </div>

      <SubscriptionContextCards />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-fraunces text-2xl font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}
