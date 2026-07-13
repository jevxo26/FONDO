import { Truck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function RidersPage() {
  return (
    <div>
      <PageHeader
        title="All Riders"
        description="View and manage all registered riders."
        icon={Truck}
      />
    </div>
  );
}
