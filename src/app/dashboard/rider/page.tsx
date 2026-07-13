import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Bike, DollarSign, MapPin, Package } from "lucide-react";

export default function RiderDeliveriesPage() {
  return (
    <div>
      <PageHeader
        title="My Deliveries"
        description="View and manage your assigned deliveries."
        icon={Bike}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Active Deliveries" value="3" icon={MapPin} accent="right" />
        <StatCard label="Completed Today" value="12" variant="success" icon={Package} accent="right" />
        <StatCard label="Earnings Today" value="৳1,850" variant="default" icon={DollarSign} accent="right" />
      </div>
    </div>
  );
}
