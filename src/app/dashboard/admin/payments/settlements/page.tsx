import { ArrowLeftRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function PaymentsSettlementsPage() {
  return (
    <div>
      <PageHeader
        title="Settlements"
        description="Manage platform-wide payment settlements."
        icon={ArrowLeftRight}
      />
    </div>
  );
}
