import { Clock } from "lucide-react";
import { VendorApprovalQueue } from "@/components/dashboard/vendors/vendor-approval-queue";

export default function VendorsPendingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Clock className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Pending Approval
          </h2>
          <p className="mt-1 text-muted-foreground">
            Review and approve newly registered vendors.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <VendorApprovalQueue />
      </div>
    </div>
  );
}