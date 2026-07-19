import { refunds } from "@/data/payments";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Wallet, Clock, Activity } from "lucide-react";

export function RefundSummaryCards() {
  const total = refunds.length;
  const pending = refunds.filter((r) => r.status === "PENDING").length;
  const processed = refunds.filter((r) => r.status === "PROCESSED").length;
  const rejected = refunds.filter((r) => r.status === "REJECTED").length;
  const totalAmount = refunds.reduce((s, r) => s + r.amount, 0);
  const processRate = total > 0 ? Math.round((processed / total) * 100) : 0;
  const avgProcessing = 2.1;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <DarkCard
        icon={<Wallet className="size-32" />}
        title="Total Refund Amount"
        description={`Across ${total} requests`}
      >
        <div className="mb-6 flex items-baseline gap-2">
          <span className="font-heading text-3xl font-bold text-primary">৳</span>
          <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
            {totalAmount.toLocaleString()}
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Processed</p>
            <p className="flex items-center font-bold text-success">{processed}/{total}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rate</p>
            <p className="flex items-center font-bold text-white">{processRate}%</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg Time</p>
            <p className="font-bold text-white">{avgProcessing} Days</p>
          </div>
        </div>
      </DarkCard>
      <GlassCard
        icon={<Activity className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Request Breakdown"
        value={`${pending} Pending`}
        subtitle="Across all refunds"
      >
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <span className="size-2 rounded-full bg-warning" /> Pending
            </span>
            <span className="text-xs font-bold">{pending}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <span className="size-2 rounded-full bg-success" /> Processed
            </span>
            <span className="text-xs font-bold">{processed}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <span className="size-2 rounded-full bg-destructive" /> Rejected
            </span>
            <span className="text-xs font-bold">{rejected}</span>
          </div>
        </div>
      </GlassCard>
      <GlassCard
        icon={<Clock className="size-5 text-warning" />}
        iconBg="bg-warning/10"
        title="Processing Time"
        value={`${avgProcessing} Days`}
        subtitle="Avg. from request to resolution"
      >
        <div className="mt-4 text-xs text-muted-foreground">
          Target: 48 hours — currently exceeding by {(avgProcessing * 24 - 48).toFixed(0)}h
        </div>
      </GlassCard>
    </div>
  );
}
