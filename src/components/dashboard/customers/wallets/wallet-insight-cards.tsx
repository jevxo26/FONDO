import { Gift, Smartphone, CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export function WalletInsightCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
      <DarkCard
        variant="primary"
        icon={<Gift className="size-32" />}
        title="Seasonal Loyalty Drive"
        description="Auto-credit ৳500 to all Platinum members who haven't ordered in 30 days."
      >
        <Button variant="outline" className="w-full rounded-full">
          Launch Bulk Reward
        </Button>
      </DarkCard>

      <GlassCard
        icon={<ShieldCheck className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Wallet Distribution by Tier"
        value="3 tiers"
        subtitle="active distribution"
      >
        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-bold">Platinum Elite</span>
              <span className="font-bold text-primary">৳2.1M</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted">
              <div className="h-full w-[75%] rounded-full bg-primary" />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-bold">Heritage Gold</span>
              <span className="font-bold text-foreground">৳1.4M</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted">
              <div className="h-full w-[50%] rounded-full bg-foreground" />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-bold">Standard</span>
              <span className="font-bold text-muted-foreground">৳0.8M</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted">
              <div className="h-full w-[30%] rounded-full bg-border" />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard
        icon={<Smartphone className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Top-Up Channels"
        value="3 methods"
        subtitle="active payment channels"
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-full border border-border/30 bg-card px-4 py-2 text-sm shadow-sm">
            <Smartphone className="size-4 text-success" />
            bKash (42%)
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/30 bg-card px-4 py-2 text-sm shadow-sm">
            <CreditCard className="size-4 text-primary" />
            Credit Card (35%)
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/30 bg-card px-4 py-2 text-sm shadow-sm">
            <Landmark className="size-4 text-foreground" />
            Bank Transfer (23%)
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
