import { CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export function PaymentSummaryCards() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-7">
        <DarkCard
          icon={<CreditCard className="size-32" />}
          title="Total Revenue Collected"
          description="+12.4% growth this month"
        >
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
            <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">1,42,850.00</h2>
          </div>
          <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Growth</p>
              <p className="flex items-center font-bold text-success">
                <TrendingUp className="mr-1 size-4" />
                +12.4%
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Successful</p>
              <p className="font-bold text-white">2,143 Tx</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg. Order</p>
              <p className="font-bold text-white">৳1,250</p>
            </div>
          </div>
        </DarkCard>
      </div>

      <div className="col-span-12 md:col-span-5">
        <GlassCard
          icon={<TrendingUp className="size-5 text-primary" />}
          iconBg="bg-primary/10"
          title="Pending Payouts"
          value="৳28,400.00"
          subtitle="Next payout: Oct 24"
        >
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-muted mb-2">
              <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }} />
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">65% processed</span>
              <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary">
                Process Now
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
