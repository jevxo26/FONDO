import { Wallet, Download } from "lucide-react";
import { riderEarnings } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderEarningsSection } from "@/components/dashboard/admin/riders/earnings/rider-earnings-section";
import { RiderEarningsSummaryCards } from "@/components/dashboard/admin/riders/earnings/rider-earnings-summary-cards";
import { Button } from "@/components/ui/button";

export default function RidersEarningsPage() {
  return (
    <div>
      <PageHeader
        title="Earnings"
        description="View rider earnings and payout history."
        icon={Wallet}
        actions={<Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>}
      />
      <div className="mt-8">
        <RiderEarningsSummaryCards />
      </div>
      <div className="mt-8">
        <RiderEarningsSection data={riderEarnings} />
      </div>
    </div>
  );
}
