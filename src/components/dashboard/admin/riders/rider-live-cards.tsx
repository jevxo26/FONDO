import { riderLiveData } from "@/data/riders";
import { RiderStatusBadge } from "./rider-status-badge";
import { MapPin, Navigation, Wifi } from "lucide-react";

export function RiderLiveCards() {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <Wifi className="size-5 text-success" />
          <h3 className="font-fraunces text-xl font-semibold text-foreground">Live Tracking</h3>
          <span className="ml-auto rounded-full bg-success/10 px-3 py-0.5 text-[11px] font-bold text-success">
            {riderLiveData.length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {riderLiveData.map((rider) => (
            <div
              key={rider.id}
              className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">{rider.name}</p>
                  <p className="text-xs text-muted-foreground">{rider.phone}</p>
                </div>
                <RiderStatusBadge status={rider.status} />
              </div>

              <div className="mb-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0" />
                  <span>{rider.zone}</span>
                </div>
                {rider.currentOrder && (
                  <div className="flex items-center gap-2">
                    <Navigation className="size-3.5 shrink-0 text-primary" />
                    <span className="font-medium text-primary">{rider.currentOrder}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border/50 pt-3 text-[11px]">
                <span className="text-muted-foreground">{rider.eta}</span>
                <span className="text-muted-foreground">{rider.speed}</span>
                <span className={`font-bold ${rider.battery > 50 ? "text-success" : "text-warning"}`}>
                  🔋 {rider.battery}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
