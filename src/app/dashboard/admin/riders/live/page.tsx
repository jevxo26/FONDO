import { MapPin, Truck, Clock, Navigation, Wifi } from "lucide-react";
import { riders, riderLiveData } from "@/data/riders";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderLiveCards } from "@/components/dashboard/admin/riders/rider-live-cards";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export default function RidersLivePage() {
  const activeNow = riderLiveData.length;
  const totalDelivering = riderLiveData.filter((r) => r.currentOrder).length;
  const avgBattery = Math.round(riderLiveData.reduce((s, r) => s + r.battery, 0) / riderLiveData.length);

  return (
    <div>
      <PageHeader
        title="Live Tracking"
        description="View real-time rider locations and routes."
        icon={MapPin}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Live Riders" value={activeNow} icon={Wifi} accent="bottom" />
        <StatCard label="On Delivery" value={totalDelivering} variant="success" icon={Navigation} accent="bottom" />
        <StatCard label="Avg Battery" value={`${avgBattery}%`} variant="warning" icon={Truck} accent="bottom" />
        <StatCard label="Coverage" value="8 Zones" variant="default" icon={MapPin} accent="bottom" />
      </div>
      <div className="mt-8">
        <RiderLiveCards />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <GlassCard
          icon={<Navigation className="size-5 text-success" />}
          iconBg="bg-success/10"
          title="Active Deliveries"
          value={totalDelivering.toString()}
          subtitle="Riders currently on route"
        />
        <GlassCard
          icon={<Clock className="size-5 text-warning" />}
          iconBg="bg-warning/10"
          title="Avg Delivery Time"
          value="28m"
          subtitle="Last hour average"
        />
        <GlassCard
          icon={<MapPin className="size-5 text-primary" />}
          title="Busiest Zone"
          value="Gulshan"
          subtitle="12 active orders"
        />
      </div>
    </div>
  );
}
