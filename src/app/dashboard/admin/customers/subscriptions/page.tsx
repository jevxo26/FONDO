import { Repeat } from "lucide-react";
import { SubscriptionContent } from "@/components/dashboard/admin/customers/subscriptions/subscription-content";
import { PageHeader } from "@/components/dashboard/common/page-header";


export default function SubscriptionsPage() {
  return (
    <div>
      <PageHeader
        title="Subscription Management"
        description="Manage and monitor all customer meal subscriptions."
        icon={Repeat}
      />
      <SubscriptionContent />
    </div>
  );
}
