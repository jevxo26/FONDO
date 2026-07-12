import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function RidersPerformancePage() {
  return (
    <div>
      <PageHeader
        title="Performance"
        description="Analyze rider delivery performance and ratings."
        icon={BarChart3}
      />
    </div>
  );
}
