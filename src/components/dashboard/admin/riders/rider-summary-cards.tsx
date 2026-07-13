import { riders } from "@/data/riders";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Truck, Award, MapPin, DollarSign, TrendingUp } from "lucide-react";

export function RiderSummaryCards() {
  const total = riders.length;
  const active = riders.filter((r) => r.status === "ACTIVE").length;
  const busy = riders.filter((r) => r.status === "BUSY").length;
  const offline = riders.filter((r) => r.status === "OFFLINE" || r.status === "ON_LEAVE").length;
  const totalEarn = riders.reduce((s, r) => s + r.earnings, 0);
  const avgRating = (riders.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const zoneCount = [...new Set(riders.map((r) => r.zone))].length;
  const topZones = ["Gulshan", "Banani", "Uttara", "Dhanmondi"].map((z) => ({
    name: z,
    count: riders.filter((r) => r.zone === z).length,
  }));

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
        <DarkCard
          icon={<Award className="size-40" />}
          title="Fleet Performance"
          description={`${avgRating} avg rating · ${zoneCount} zones`}
        >
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">{total}</h2>
            <span className="text-sm text-white/70">Total Riders</span>
          </div>
          <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Active
              </span>
              <p className="font-bold text-success">{active}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Busy
              </span>
              <p className="font-bold text-warning">{busy}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Offline
              </span>
              <p className="font-bold text-muted-foreground">{offline}</p>
            </div>
          </div>
        </DarkCard>
        <StatCard
          label="Total Earnings"
          value={`৳${totalEarn.toLocaleString()}`}
          variant="success"
          icon={DollarSign}
          accent="bottom"
          className="flex-1"
        />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <GlassCard
          icon={<MapPin className="size-5 text-primary" />}
          iconBg="bg-primary/10"
          title="Zone Coverage"
          value={`${zoneCount} Zones`}
          subtitle="Active in Dhaka"
          className="h-full"
        >
          <div className="mt-4 space-y-2">
            {topZones.map((z) => (
              <div
                key={z.name}
                className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
              >
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <MapPin className="size-3 text-primary" /> {z.name}
                </span>
                <span className="text-xs font-bold">{z.count} riders</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Avg per rider: ৳{Math.round(totalEarn / total).toLocaleString()} earnings
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
