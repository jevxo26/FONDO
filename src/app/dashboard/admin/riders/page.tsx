import { Truck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RidersAll } from "@/components/dashboard/admin/riders/riders-all";

export default function RidersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="All Riders" description="View and manage all registered riders." icon={Truck} />
      <RidersAll />
    </div>
  );
}
