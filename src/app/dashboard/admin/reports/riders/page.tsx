import { Truck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function ReportsRidersPage() {
  return (
    <div>
      <PageHeader
        title="Rider Report"
        description="Rider delivery and earnings reports."
        icon={Truck}
      />
    </div>
  );
}
