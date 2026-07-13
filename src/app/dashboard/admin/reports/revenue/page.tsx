import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsRevenuePage() {
  return (
    <div>
      <PageHeader
        title="Revenue Report"
        description="Analyze platform revenue across all streams."
        icon={TrendingUp}
      />
    </div>
  );
}
