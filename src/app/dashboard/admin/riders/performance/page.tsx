import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RidersPerformance } from "@/components/dashboard/admin/riders/riders-performance";

export default function RidersPerformancePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Performance" description="Analyze rider delivery performance and ratings." icon={BarChart3} />
      <RidersPerformance />
    </div>
  );
}
