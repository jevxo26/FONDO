import { Download, Gift, Wallet } from "lucide-react";
import { walletTransactions } from "@/data/wallets";
import { WalletSummaryCards } from "@/components/dashboard/admin/customers/wallets/wallet-summary-cards";
import { WalletTableSection } from "@/components/dashboard/admin/customers/wallets/wallet-table-section";
import { WalletInsightCards } from "@/components/dashboard/admin/customers/wallets/wallet-insight-cards";
import { PageHeader } from "@/components/dashboard/common/page-header";

import { Button } from "@/components/ui/button";

export default function WalletsPage() {
  return (
    <div>
      <PageHeader
        title="Customer Wallets"
        description="Oversee liquidity across the ecosystem. Manage rewards, monitor top-ups, and analyze spending patterns."
        icon={Wallet}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export Logs
            </Button>
            <Button className="rounded-full">
              <Gift className="size-[18px]" />
              Credit Reward
            </Button>
          </>
        }
      />
      <div className="mt-8">
        <WalletSummaryCards />
      </div>
      <div className="mt-8">
        <WalletTableSection data={walletTransactions} />
      </div>
      <WalletInsightCards />
    </div>
  );
}
