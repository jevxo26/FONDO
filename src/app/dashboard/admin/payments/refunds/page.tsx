import { Undo2, Wallet } from "lucide-react";
import { refunds } from "@/data/payments";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RefundTableSection } from "@/components/dashboard/admin/payments/refunds/refund-table-section";
import { RefundSummaryCards } from "@/components/dashboard/admin/payments/refunds/refund-summary-cards";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export default function PaymentsRefundsPage() {
  const total = refunds.length;
  const totalAmount = refunds.reduce((s, r) => s + r.amount, 0);
  const topReason = refunds.reduce<string[]>((acc, r) => {
    const existing = acc.find((x) => x.startsWith(r.reason));
    if (!existing) acc.push(`${r.reason} (${refunds.filter((x) => x.reason === r.reason).length})`);
    return acc;
  }, []).slice(0, 3);

  return (
    <div>
      <PageHeader title="Refunds" description="Process and track customer refund requests." icon={Undo2} />
      <div className="mt-8">
        <RefundSummaryCards />
      </div>
      <div className="mt-8">
        <RefundTableSection data={refunds} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DarkCard icon={<Wallet className="size-40" />} title="Total Refund Amount" description={`Across ${total} requests`}>
          <div className="font-heading text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">৳{totalAmount.toLocaleString()}</div>
          <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${(refunds.filter((r) => r.status === "PROCESSED").length / total) * 100}%` }} />
            </div>
            <span className="shrink-0 text-xs">{refunds.filter((r) => r.status === "PROCESSED").length}/{total} processed</span>
          </div>
        </DarkCard>
        <GlassCard icon={<Undo2 className="size-5 text-warning" />} iconBg="bg-warning/10" title="Top Reasons" value={topReason.length.toString()} subtitle="Most common refund causes">
          <div className="mt-4 space-y-1.5">
            {topReason.map((r) => (
              <div key={r} className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">{r}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
