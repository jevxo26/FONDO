import { Clock, CheckCircle, XCircle, Target } from "lucide-react";
import { StatCard } from "@/components/dashboard/common/stat-card";
import type { RiderOwnPerformance } from "@/data/riders";

export function PerformanceCards({ perf }: { perf: RiderOwnPerformance }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Completed" value={perf.completedDeliveries} icon={CheckCircle} variant="success" accent="right" />
      <StatCard label="Avg. Delivery Time" value={perf.averageDeliveryTime} icon={Clock} accent="right" />
      <StatCard label="Acceptance Rate" value={`${perf.acceptanceRate}%`} icon={Target} variant="warning" accent="right" />
      <StatCard label="Cancelled" value={perf.cancelledDeliveries} icon={XCircle} variant="danger" accent="right" />
    </div>
  );
}
