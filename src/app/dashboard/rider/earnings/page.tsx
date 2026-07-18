import { DollarSign } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { EarningsSummaryCards } from "@/components/dashboard/rider/earnings-summary-cards";
import { WalletSection } from "@/components/dashboard/rider/wallet-section";
import { walletBalance, walletTransactions } from "@/data/riders";

export default function RiderEarningsPage() {
  return (
    <div>
      <PageHeader title="Earnings" description="Track your delivery earnings and tips." icon={DollarSign} />
      <EarningsSummaryCards today="৳1,850" week="৳11,200" pending="৳4,500" rating={4.8} />
      <div className="mt-10">
        <WalletSection balance={walletBalance} transactions={walletTransactions} />
      </div>
    </div>
  );
}
