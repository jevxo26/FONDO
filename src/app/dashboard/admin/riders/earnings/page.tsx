import { Wallet, DollarSign, TrendingUp, Award, Download } from "lucide-react";
import { riderEarnings } from "@/data/riders";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderEarningsSection } from "@/components/dashboard/admin/riders/rider-earnings-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function RidersEarningsPage() {
  const paid = riderEarnings.filter((e) => e.status === "PAID").reduce((s, e) => s + e.total, 0);
  const pending = riderEarnings.filter((e) => e.status !== "PAID").reduce((s, e) => s + e.total, 0);
  const totalDeliveries = riderEarnings.reduce((s, e) => s + e.deliveries, 0);
  const totalBonus = riderEarnings.reduce((s, e) => s + e.bonus, 0);

  return (
    <div>
      <PageHeader
        title="Earnings"
        description="View rider earnings and payout history."
        icon={Wallet}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Paid" value={`৳${paid.toLocaleString()}`} icon={DollarSign} accent="bottom" />
        <StatCard label="Pending" value={`৳${pending.toLocaleString()}`} variant="warning" icon={Wallet} accent="bottom" />
        <StatCard label="Total Deliveries" value={totalDeliveries} icon={TrendingUp} accent="bottom" />
        <StatCard label="Bonus Paid" value={`৳${totalBonus.toLocaleString()}`} variant="success" icon={Award} accent="bottom" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <RiderEarningsSection data={riderEarnings} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <GlassCard
            icon={<DollarSign className="size-5 text-success" />}
            iconBg="bg-success/10"
            title="Payout Summary"
            value={`৳${(paid + pending).toLocaleString()}`}
            subtitle="Total across all riders"
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Paid</span>
                <span className="text-sm font-bold text-success">৳{paid.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Unpaid</span>
                <span className="text-sm font-bold text-warning">৳{pending.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Avg per Rider</span>
                <span className="text-sm font-bold text-foreground">৳{Math.round((paid + pending) / 15).toLocaleString()}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
