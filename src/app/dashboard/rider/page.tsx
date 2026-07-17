import { Bike, DollarSign, MapPin, Package } from "lucide-react";
import { riderDeliveries } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DashboardActiveDeliveries } from "@/components/dashboard/rider/dashboard-active-deliveries";

export default function RiderDashboardPage() {
  const activeDeliveries = riderDeliveries.filter(
    (d) => !["DELIVERED", "FAILED", "CANCELLED"].includes(d.status),
  );
  const completedToday = riderDeliveries.filter((d) => d.status === "DELIVERED");
  const activeCount = activeDeliveries.length;
  const completedCount = completedToday.length;

  return (
    <div>
      <PageHeader title="Dashboard" description="Your delivery overview." icon={Bike} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Active Deliveries" value={activeCount} icon={MapPin} accent="right" />
        <StatCard label="Completed Today" value={completedCount} variant="success" icon={Package} accent="right" />
        <StatCard label="Earnings Today" value="৳1,850" variant="default" icon={DollarSign} accent="right" />
      </div>
      <div className="mt-8">
        <h3 className="font-fraunces text-lg font-semibold text-foreground">Active Deliveries</h3>
        <DashboardActiveDeliveries data={activeDeliveries} />
      </div>
    </div>
  );
}
