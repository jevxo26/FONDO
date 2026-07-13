import { Repeat } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportSubscriptions } from "@/components/dashboard/admin/reports/report-subscriptions";

export default function ReportsSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Subscription Report" description="Subscription metrics, renewals, and churn analysis." icon={Repeat} />
      <ReportSubscriptions />
    </div>
  );
}
