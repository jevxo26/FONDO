import { Wallet } from "lucide-react";
import { vendorSettlements } from "@/data/vendors";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { SettlementTableSection } from "@/components/dashboard/admin/vendors/settlement-table-section";
import { SettlementSummaryCards } from "@/components/dashboard/admin/vendors/settlement-summary-cards";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function VendorsSettlementPage() {
  const lastSettledAmount = vendorSettlements
    .filter((s) => s.status === "Settled")
    .reduce((s, v) => s + v.amount, 0);
  const lastSettled = vendorSettlements.filter((s) => s.status === "Settled").length;

  return (
    <div>
      <PageHeader
        title="Settlement"
        description="Manage vendor payouts and settlement reports."
        icon={Wallet}
      />
      <div className="mt-8">
        <SettlementSummaryCards />
      </div>
      <div className="mt-8">
        <SettlementTableSection data={vendorSettlements} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        <GlassCard
          icon={<Wallet className="size-5 text-primary" />}
          iconBg="bg-primary/10"
          title="Total Settled"
          value={`${lastSettled} payments`}
          subtitle="Successfully processed"
        >
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Value: ৳{lastSettledAmount.toLocaleString()}
          </div>
        </GlassCard>
        <DarkCard
          icon={<Calendar className="size-40" />}
          title="Last Settlement Run"
          description="Processed on Nov 02, 2023"
        >
          <div className="font-bold text-white">{lastSettled} vendors paid</div>
          <div className="mt-2 text-sm text-white/70">
            ৳{lastSettledAmount.toLocaleString()} disbursed
          </div>
          <Button variant="link" className="mt-3 h-auto p-0 text-xs font-bold text-primary">
            View Report <ArrowUpRight className="size-3" />
          </Button>
        </DarkCard>
        <GlassCard
          icon={<Calendar className="size-5 text-success" />}
          iconBg="bg-success/10"
          title="Next Payout"
          value="Nov 07, 2023"
          subtitle="Scheduled"
        />
      </div>
    </div>
  );
}
