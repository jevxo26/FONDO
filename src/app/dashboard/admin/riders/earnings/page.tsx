import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RidersEarnings } from "@/components/dashboard/admin/riders/riders-earnings";

export default function RidersEarningsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Earnings" description="View rider earnings and payout history." icon={Wallet} />
      <RidersEarnings />
    </div>
  );
}
