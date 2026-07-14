import { Repeat, Download } from "lucide-react";
import { subscriptionReportData } from "@/data/reports";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportSubscriptionsSection } from "@/components/dashboard/admin/reports/subscriptions/report-subscriptions-section";
import { SubscriptionReportSummaryCards } from "@/components/dashboard/admin/reports/subscriptions/subscription-report-summary-cards";
import { Button } from "@/components/ui/button";

export default function ReportsSubscriptionsPage() {
  return (
    <div>
      <PageHeader title="Subscription Report" description="Subscription metrics, renewals, and churn analysis." icon={Repeat}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>}
      />
      <div className="mt-8">
        <SubscriptionReportSummaryCards />
      </div>
      <div className="mt-8">
        <ReportSubscriptionsSection data={subscriptionReportData} />
      </div>
    </div>
  );
}
