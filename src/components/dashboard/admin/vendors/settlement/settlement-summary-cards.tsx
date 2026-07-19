import { vendorSettlements } from "@/data/vendors";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Wallet, AlertTriangle, TrendingUp, CheckCircle, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function SettlementSummaryCards() {
  const totalSettled = vendorSettlements.filter((s) => s.status === "Settled").length;
  const totalProcessing = vendorSettlements.filter((s) => s.status === "Processing").length;
  const totalFlagged = vendorSettlements.filter((s) => s.status === "Flagged").length;
  const totalAmount = vendorSettlements.reduce((s, v) => s + v.amount, 0);
  const outstandingAmount = vendorSettlements
    .filter((s) => s.status !== "Settled")
    .reduce((s, v) => s + v.amount, 0);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <StatCard
        label="Total Settled"
        value={totalSettled}
        variant="success"
        icon={CheckCircle}
        accent="right"
        className="flex-1"
      />
      <GlassCard
        icon={<TrendingUp className="size-5 text-warning" />}
        iconBg="bg-warning/10"
        title="Processing"
        value={totalProcessing.toString()}
        subtitle="Awaiting payout"
        className="flex-1"
      >
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Value: ৳{outstandingAmount.toLocaleString()}
          </span>
          <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary">
            Process All
          </Button>
        </div>
      </GlassCard>
      <DarkCard
        icon={<Banknote className="size-10" />}
        title="Total Payout Volume"
        description={`${vendorSettlements.length} settlements processed`}
        className="flex-1"
      >
        <div className="mb-6 flex items-baseline gap-2">
          <span className="font-heading text-3xl font-bold text-primary">৳</span>
          <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
            {totalAmount.toLocaleString()}
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Settled</p>
            <p className="font-bold text-success">{totalSettled}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Flagged</p>
            <p className="font-bold text-destructive">{totalFlagged}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Outstanding</p>
            <p className="font-bold text-warning">৳{outstandingAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg</p>
            <p className="font-bold text-white">৳{Math.round(totalAmount / vendorSettlements.length).toLocaleString()}</p>
          </div>
        </div>
        <Button variant="link" className="mt-4 h-auto gap-1 p-0 text-xs font-bold text-primary">
          View Full Report <ArrowUpRight className="size-3" />
        </Button>
      </DarkCard>
    </div>
  );
}
