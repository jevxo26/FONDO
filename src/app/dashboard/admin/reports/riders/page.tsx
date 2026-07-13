import { Truck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportRiders } from "@/components/dashboard/admin/reports/report-riders";

export default function ReportsRidersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rider Report" description="Rider delivery and earnings reports." icon={Truck} />
      <ReportRiders />
    </div>
  );
}
