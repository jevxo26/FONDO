import { Download, Gift } from "lucide-react";
import { walletTransactions } from "@/data/wallets";
import { WalletSummaryCards } from "@/components/dashboard/customers/wallets/wallet-summary-cards";
import { WalletTableSection } from "@/components/dashboard/customers/wallets/wallet-table-section";
import { WalletInsightCards } from "@/components/dashboard/customers/wallets/wallet-insight-cards";
import { Button } from "@/components/ui/button";

export default function WalletsPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Customer Wallets
          </h2>
          <p className="mt-2 text-muted-foreground">
            Oversee liquidity across the ecosystem. Manage rewards, monitor top-ups, and analyze spending patterns.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" />
            Export Logs
          </Button>
          <Button className="rounded-full">
            <Gift className="size-[18px]" />
            Credit Reward
          </Button>
        </div>
      </div>

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
