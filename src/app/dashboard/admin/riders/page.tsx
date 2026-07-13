import { Truck, CheckCircle, Clock, UserX, MapPin, Download, UserPlus } from "lucide-react";
import { riders } from "@/data/riders";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderTableSection } from "@/components/dashboard/admin/riders/rider-table-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Button } from "@/components/ui/button";

export default function RidersPage() {
  const total = riders.length;
  const active = riders.filter((r) => r.status === "ACTIVE").length;
  const busy = riders.filter((r) => r.status === "BUSY").length;
  const offline = riders.filter((r) => r.status === "OFFLINE" || r.status === "ON_LEAVE").length;
  const totalEarn = riders.reduce((s, r) => s + r.earnings, 0);

  return (
    <div>
      <PageHeader
        title="All Riders"
        description="View and manage all registered riders."
        icon={Truck}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" /> Export
            </Button>
            <Button className="rounded-full">
              <UserPlus className="size-[18px]" /> Add Rider
            </Button>
          </>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Riders" value={total} icon={Truck} accent="bottom" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="bottom" />
        <StatCard label="Busy" value={busy} variant="warning" icon={Clock} accent="bottom" />
        <StatCard label="Offline" value={offline} variant="danger" icon={UserX} accent="bottom" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <RiderTableSection data={riders} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DarkCard
            icon={<MapPin className="size-40" />}
            title="Zone Coverage"
            description="Riders distributed across 8 zones in Dhaka"
          >
            <div className="mt-4 space-y-2">
              {["Gulshan", "Banani", "Uttara", "Mirpur", "Dhanmondi"].map((zone) => {
                const count = riders.filter((r) => r.zone === zone).length;
                return (
                  <div key={zone} className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2">
                    <span className="text-xs font-semibold text-white/70">{zone}</span>
                    <span className="text-xs font-bold text-white">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Total Earnings</p>
              <p className="mt-1 text-base font-bold text-white">৳{totalEarn.toLocaleString()}</p>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
