"use client";

import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Rider } from "@/store/api/slices/rider-api";
import { Award, MapPin, Wallet } from "lucide-react";

interface RiderSummaryCardsProps {
  riders: Rider[];
}

export function RiderSummaryCards({ riders }: RiderSummaryCardsProps) {
  const total = riders.length;

  // Real backend status filters
  const approved = riders.filter((r) => r.status === "APPROVED").length;
  const pending = riders.filter((r) => r.status === "PENDING").length;
  const suspended = riders.filter((r) => r.status === "SUSPENDED" || r.status === "REJECTED").length;
  const online = riders.filter((r) => r.isOnline).length;

  // Wallet calculation
  const totalWalletBalance = riders.reduce(
    (acc, r) => acc + (r.wallet?.currentBalance || 0),
    0
  );

  // Dynamic zone calculation from workZone field
  const zones = riders.map((r) => r.workZone).filter(Boolean);
  const zoneCount = [...new Set(zones)].length;

  // Dynamic Top Work Zones
  const zoneCountsMap = zones.reduce<Record<string, number>>((acc, zone) => {
    acc[zone] = (acc[zone] || 0) + 1;
    return acc;
  }, {});

  const topZones = Object.entries(zoneCountsMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
        <DarkCard
          icon={<Award className="size-40" />}
          title="Fleet Overview"
          description={`${online} online now · ${zoneCount} active zones`}
        >
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">{total}</h2>
            <span className="text-sm text-white/70">Total Registered</span>
          </div>
          <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Approved
              </span>
              <p className="font-bold text-success">{approved}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Pending
              </span>
              <p className="font-bold text-warning">{pending}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Suspended/Rejected
              </span>
              <p className="font-bold text-destructive">{suspended}</p>
            </div>
          </div>
        </DarkCard>

        <StatCard
          label="Total Fleet Wallet Balance"
          value={`৳${totalWalletBalance.toLocaleString()}`}
          variant="success"
          icon={Wallet}
          accent="bottom"
          className="flex-1"
        />
      </div>

      <div className="col-span-12 lg:col-span-6">
        <GlassCard
          icon={<MapPin className="size-5 text-foreground" />}
          iconBg="bg-primary/10"
          title="Zone Coverage"
          value={`${zoneCount} Zones`}
          subtitle="Registered Operational Areas"
          className="h-full"
        >
          <div className="mt-4 space-y-2">
            {topZones.length > 0 ? (
              topZones.map((z) => (
                <div
                  key={z.name}
                  className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold">
                    <MapPin className="size-3 text-muted-foreground" /> {z.name}
                  </span>
                  <span className="text-xs font-bold">{z.count} riders</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No work zones available</p>
            )}
          </div>
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Avg balance per rider: ৳{total > 0 ? Math.round(totalWalletBalance / total).toLocaleString() : 0}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}