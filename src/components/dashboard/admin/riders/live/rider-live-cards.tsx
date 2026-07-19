import { riderLiveData } from "@/data/riders";
import type { RiderStatus } from "@/data/riders";
import { RiderStatusBadge } from "../all-riders/rider-status-badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { MapPin, Navigation, Wifi, Gauge, Battery, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const statusBorder: Record<RiderStatus, string> = {
  ACTIVE: "border-l-success",
  BUSY: "border-l-warning",
  OFFLINE: "border-l-muted-foreground",
  ON_LEAVE: "border-l-destructive",
};

const cardBg: Record<RiderStatus, string> = {
  ACTIVE: "from-emerald-500/20 via-emerald-500/5 to-emerald-500/2",
  BUSY: "from-amber-500/20 via-amber-500/5 to-amber-500/2",
  OFFLINE: "from-gray-500/15 via-gray-500/3 to-gray-500/1",
  ON_LEAVE: "from-rose-500/20 via-rose-500/5 to-rose-500/2",
};

const avatarBg: Record<RiderStatus, string> = {
  ACTIVE: "bg-success/15 text-success",
  BUSY: "bg-warning/15 text-warning",
  OFFLINE: "bg-muted text-muted-foreground",
  ON_LEAVE: "bg-destructive/15 text-destructive",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function batteryBarColor(b: number): string {
  return b > 60 ? "bg-success" : b > 30 ? "bg-warning" : "bg-destructive";
}

function batteryTextColor(b: number): string {
  return batteryBarColor(b).replace("bg-", "text-");
}

export function RiderLiveCards() {
  const active = riderLiveData.filter((r) => r.status === "ACTIVE").length;
  const busy = riderLiveData.filter((r) => r.status === "BUSY").length;
  const avgSpeed = Math.round(
    riderLiveData.reduce((s, r) => s + parseInt(r.speed), 0) / riderLiveData.length,
  );
  const avgBattery = Math.round(
    riderLiveData.reduce((s, r) => s + r.battery, 0) / riderLiveData.length,
  );

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Wifi className="size-5 text-success" />
        <h3 className="font-heading text-xl font-semibold text-foreground">Live Fleet Tracking</h3>
        <span className="ml-auto rounded-full bg-success/10 px-3 py-0.5 text-[11px] font-bold text-success">
          {riderLiveData.length} Active
        </span>
      </div>

      <div className="mb-6 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Riders" value={active} variant="success" icon={Truck} accent="top" className="bg-gradient-to-br from-emerald-500/25 via-emerald-500/5 to-emerald-500/2" />
        <StatCard label="On Delivery" value={busy} variant="warning" icon={Navigation} accent="top" className="bg-gradient-to-br from-amber-500/25 via-amber-500/5 to-amber-500/2" />
        <StatCard label="Avg Speed" value={`${avgSpeed} km/h`} icon={Gauge} accent="top" className="bg-gradient-to-br from-sky-500/25 via-sky-500/5 to-sky-500/2" />
        <StatCard
          label="Avg Battery"
          value={`${avgBattery}%`}
          variant={avgBattery > 60 ? "success" : avgBattery > 30 ? "warning" : "danger"}
          icon={Battery}
          accent="top"
          className="bg-gradient-to-br from-violet-500/25 via-violet-500/5 to-violet-500/2"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {riderLiveData.map((rider) => (
          <div
            key={rider.id}
            className={cn(
              "group relative overflow-hidden rounded-3xl border-l-[3px] bg-gradient-to-br p-5 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]",
              cardBg[rider.status],
              statusBorder[rider.status],
            )}
          >
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

            <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-24 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-16 rounded-full bg-primary/5 blur-2xl" />

            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl text-[13px] font-bold shadow-sm",
                    avatarBg[rider.status],
                  )}
                >
                  {getInitials(rider.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{rider.name}</p>
                  <RiderStatusBadge status={rider.status} />
                </div>
              </div>
            </div>

            <div className="relative z-10 mb-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                <span>{rider.zone}</span>
              </div>
              {rider.currentOrder && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                  <Navigation className="size-3" />
                  {rider.currentOrder}
                </div>
              )}
            </div>

            <div className="relative z-10 mb-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

            <div className="relative z-10 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs">
                <Clock className="size-3.5 text-muted-foreground" />
                <span className="font-bold text-foreground">{rider.eta}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Gauge className="size-3.5 text-muted-foreground" />
                <span className="font-bold text-foreground">{rider.speed}</span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Battery className="size-3" />
                  Battery
                </span>
                <span className={cn("text-[11px] font-bold", batteryTextColor(rider.battery))}>
                  {rider.battery}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className={cn("h-1.5 rounded-full transition-all", batteryBarColor(rider.battery))}
                  style={{ width: `${rider.battery}%` }}
                />
              </div>
            </div>

            <p className="relative z-10 mt-3 text-[10px] text-muted-foreground">
              Updated {rider.lastUpdated}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
