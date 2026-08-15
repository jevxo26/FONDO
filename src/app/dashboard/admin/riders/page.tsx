import { Truck, Download, UserPlus } from "lucide-react";
import { riders } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderTableSection } from "@/components/dashboard/admin/riders/all-riders/rider-table-section";
import { RiderSummaryCards } from "@/components/dashboard/admin/riders/all-riders/rider-summary-cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RidersPage() {
  return (
    <div>
      <PageHeader
        title="All Riders"
        description="View and manage all registered riders."
        icon={Truck}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-4.5" /> Export Riders
            </Button>
            <Button className="rounded-full">
              <Link href={'riders/add'}>
                <UserPlus className="size-4.5" /> Add Rider
              </Link>
            </Button>
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
