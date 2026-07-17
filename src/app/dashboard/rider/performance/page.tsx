import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PerformanceCards } from "@/components/dashboard/rider/performance-cards";
import { RatingTable } from "@/components/dashboard/rider/rating-table";
import { myPerformance, riderRatings } from "@/data/riders";

export default function RiderPerformancePage() {
  return (
    <div>
      <PageHeader title="Performance" description="Your delivery stats and customer ratings." icon={BarChart3} />
      <PerformanceCards perf={myPerformance} />
      <div className="mt-10">
        <h3 className="font-fraunces text-lg font-semibold text-foreground">Completion Rate</h3>
        <p className="text-sm text-muted-foreground">{myPerformance.completionRate}% of deliveries completed successfully</p>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${myPerformance.completionRate}%` }}
          />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="font-fraunces text-lg font-semibold text-foreground">Recent Ratings</h3>
        <RatingTable data={riderRatings} />
      </div>
    </div>
  );
}
