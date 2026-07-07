import { Download, Gift } from 'lucide-react';
import { walletTransactions } from '@/data/wallets';
import { WalletSummaryCards } from '@/components/dashboard/customers/wallets/wallet-summary-cards';
import { WalletTableSection } from '@/components/dashboard/customers/wallets/wallet-table-section';
import { WalletInsightCards } from '@/components/dashboard/customers/wallets/wallet-insight-cards';

export default function WalletsPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Customer Wallets</h2>
          <p className="mt-2 text-muted-foreground">
            Oversee liquidity across the ecosystem. Manage rewards, monitor top-ups, and analyze
            spending patterns.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-foreground px-6 py-2.5 text-[11px] font-bold text-foreground transition-all hover:bg-foreground hover:text-white">
            <Download className="size-[18px]" />
            Export Logs
          </button>
          <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[11px] font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-95">
            <Gift className="size-[18px]" />
            Credit Reward
          </button>
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
