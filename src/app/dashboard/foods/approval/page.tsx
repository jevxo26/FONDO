import { ClipboardCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function FoodsApprovalPage() {
  return (
    <div>
      <PageHeader
        title="Approval Queue"
        description="Review and approve food items submitted by vendors."
        icon={ClipboardCheck}
      />
    </div>
  );
}
