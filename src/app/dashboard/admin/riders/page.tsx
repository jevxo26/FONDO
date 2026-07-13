import { Truck, Download, UserPlus } from "lucide-react";
import { riders } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderTableSection } from "@/components/dashboard/admin/riders/rider-table-section";
import { RiderSummaryCards } from "@/components/dashboard/admin/riders/rider-summary-cards";
import { Button } from "@/components/ui/button";

export default function RidersPage() {
  const total = riders.length;
  const totalEarn = riders.reduce((s, r) => s + r.earnings, 0);

  return (
    <div>
      <PageHeader
        title="All Riders"
        description="View and manage all registered riders."
        icon={Truck}
        actions={
          <>
            <Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>
            <Button className="rounded-full"><UserPlus className="size-[18px]" /> Add Rider</Button>
          </>
        }
      />
      <div className="mt-8">
        <RiderSummaryCards />
      </div>
      <div className="mt-8">
        <RiderTableSection data={riders} />
      </div>
    </div>
  );
}
