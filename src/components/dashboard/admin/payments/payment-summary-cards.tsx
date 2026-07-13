import { transactions, refunds, settlements } from "@/data/payments";
import { CreditCard, TrendingUp, Wallet } from "lucide-react";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export function PaymentSummaryCards() {
  const totalRevenue = transactions.reduce((s, t) => s + (t.status === "SUCCESS" ? t.amount : 0), 0);
  const pendingSettlements = settlements.filter((s) => s.status !== "COMPLETED").reduce((s, t) => s + t.netAmount, 0);
  const pendingRefunds = refunds.filter((r) => r.status === "PENDING").length;
  const successRate = Math.round((transactions.filter((t) => t.status === "SUCCESS").length / transactions.length) * 100);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <DarkCard
        icon={<CreditCard className="size-32" />}
        title="Total Revenue Collected"
        description={`${successRate}% success rate across ${transactions.length} transactions`}
      >
        <div className="mb-6 flex items-baseline gap-2">
          <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
          <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">
            {totalRevenue.toLocaleString()}.00
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Growth</p>
            <p className="flex items-center font-bold text-success">
              <TrendingUp className="mr-1 size-4" />+12.4%
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Successful</p>
            <p className="font-bold text-white">{transactions.filter((t) => t.status === "SUCCESS").length} Tx</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg. Order</p>
            <p className="font-bold text-white">৳{Math.round(totalRevenue / transactions.length).toLocaleString()}</p>
          </div>
        </div>
      </DarkCard>
      <GlassCard
        icon={<TrendingUp className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Pending Settlements"
        value={`৳${pendingSettlements.toLocaleString()}`}
        subtitle="Across all vendors"
      >
        <div className="mt-4">
          <div className="mb-2 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }} />
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">60% processed</span>
            <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary">Process Now</Button>
          </div>
        </div>
      </GlassCard>
      <GlassCard
        icon={<Wallet className="size-5 text-warning" />}
        iconBg="bg-warning/10"
        title="Pending Refunds"
        value={pendingRefunds.toString()}
        subtitle="Awaiting approval"
      >
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Total: ৳{refunds.filter((r) => r.status === "PENDING").reduce((s, r) => s + r.amount, 0).toLocaleString()}</span>
          <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary">Review All</Button>
        </div>
      </GlassCard>
    </div>
  );
}
