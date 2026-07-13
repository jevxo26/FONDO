import { Clock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { VendorApprovalQueue } from "@/components/dashboard/vendors/vendor-approval-queue";

export default function VendorsPendingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pending Approval"
        description="Review and approve newly registered vendors."
        icon={Clock}
      />

      <div className="mt-6">
        <VendorApprovalQueue/>
      </div>
    </div>
  );
}