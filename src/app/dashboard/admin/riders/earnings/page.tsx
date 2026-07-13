import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function RidersEarningsPage() {
  return (
    <div>
      <PageHeader
        title="Earnings"
        description="View rider earnings and payout history."
        icon={Wallet}
      />
    </div>
  );
}
