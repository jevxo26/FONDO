import { RIDER_STATS } from "./riderdata";

export function RiderStatsSection() {
  return (
    <div className="border-b border-border py-10 bg-card/40">
      <div className="wrapper px-[var(--space-container)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {RIDER_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-heading text-2xl sm:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
