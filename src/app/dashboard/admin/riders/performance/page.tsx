import { BarChart3, TrendingUp, TrendingDown, Award, Medal } from "lucide-react";
import { riderPerformanceData } from "@/data/riders";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderPerformanceSection } from "@/components/dashboard/admin/riders/rider-performance-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";

export default function RidersPerformancePage() {
  const totalDeliveries = riderPerformanceData.reduce((s, r) => s + r.deliveriesThisWeek, 0);
  const avgOnTime = Math.round(riderPerformanceData.reduce((s, r) => s + r.onTimeRate, 0) / riderPerformanceData.length);
  const avgRating = (riderPerformanceData.reduce((s, r) => s + r.avgRating, 0) / riderPerformanceData.length).toFixed(1);
  const totalComplaints = riderPerformanceData.reduce((s, r) => s + r.complaints, 0);
  const topRider = riderPerformanceData.reduce((best, r) => (r.deliveriesThisWeek > best.deliveriesThisWeek ? r : best));

  return (
    <div>
      <PageHeader
        title="Performance"
        description="Analyze rider delivery performance and ratings."
        icon={BarChart3}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Deliveries" value={totalDeliveries} icon={BarChart3} accent="bottom" />
        <StatCard label="On-Time Rate" value={`${avgOnTime}%`} variant="success" icon={TrendingUp} accent="bottom" />
        <StatCard label="Avg Rating" value={avgRating} variant="default" icon={Award} accent="bottom" />
        <StatCard label="Complaints" value={totalComplaints} variant="danger" icon={TrendingDown} accent="bottom" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <RiderPerformanceSection data={riderPerformanceData} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DarkCard
            icon={<Medal className="size-40" />}
            title="Top Performer"
            description={topRider.name}
          >
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">This Week</p>
                <p className="mt-1 text-base font-bold text-white">{topRider.deliveriesThisWeek} deliveries</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">On-Time Rate</p>
                <p className="mt-1 text-base font-bold text-success">{topRider.onTimeRate}%</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Rating</p>
                <p className="mt-1 text-base font-bold text-white">{topRider.avgRating}</p>
              </div>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
