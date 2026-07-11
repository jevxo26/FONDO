import { TrendingUp, PersonStanding, Wallet as WalletIcon } from "lucide-react";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export function WalletSummaryCards() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-5">
        <DarkCard
          icon={<WalletIcon className="size-32" />}
          title="Total Ecosystem Holdings"
          description="+12.4% from last month"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
            <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">48,92,150</h2>
          </div>
          <div className="mt-4 flex items-end gap-1">
            {[40, 60, 55, 85, 70, 50, 65].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg bg-white/10 transition-all" style={{ height: `${h / 2}%`, minHeight: '12px' }}>
                <div className={`h-full w-full rounded-t-lg ${i === 3 ? "bg-primary" : "bg-white/10"}`} />
              </div>
            ))}
          </div>
        </DarkCard>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <StatCard label="Active Wallets" value="12,482" variant="success" icon={WalletIcon} accent="top" />
        <p className="mt-2 text-sm text-muted-foreground">84% Engagement rate in loyalty programs.</p>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <GlassCard
          icon={<PersonStanding className="size-5 text-primary" />}
          iconBg="bg-primary/10"
          title="Daily Top-ups"
          value="৳1,42,500"
          subtitle="LIVE"
          layout="stack"
        >
          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span>Heritage Gold</span>
                <span className="font-bold">৳82,000</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[65%] rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span>Standard Credits</span>
                <span className="font-bold">৳60,500</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[45%] rounded-full bg-foreground" />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
