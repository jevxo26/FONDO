import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Users } from "lucide-react";

interface StatusMetricsProps {
  activeCount: number;
  suspendedCount: number;
  totalCustomers: number;
}

export function StatusMetrics({ activeCount, suspendedCount, totalCustomers }: StatusMetricsProps) {
  const activePercent = Math.round((activeCount / totalCustomers) * 100);

  return (
    <GlassCard
      icon={<Users className="size-5 text-primary" />}
      iconBg="bg-primary/10"
      title="Customer Status"
      value={`${activeCount} Active`}
      subtitle={`${suspendedCount} Suspended`}
      layout="stack"
    >
      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Active</span>
            <span className="font-bold text-foreground">{activePercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${activePercent}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Suspended</span>
            <span className="font-bold text-foreground">{100 - activePercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-muted-foreground" style={{ width: `${100 - activePercent}%` }} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
