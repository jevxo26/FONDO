import { Wallet as WalletIcon } from "lucide-react";
import type { CustomerWallet } from "@/types/wallet";

function formatMoney(n: number | undefined) {
  return n === undefined ? "0" : n.toLocaleString();
}

export function WalletBalanceCard({ wallet }: { wallet: CustomerWallet | undefined }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <WalletIcon className="size-4" /> Available Balance
      </div>
      <div className="mt-2 font-heading text-5xl font-bold text-foreground">
        ৳{formatMoney(Number(wallet?.balance ?? 0))}
      </div>
      <div className="mt-2 flex gap-6 text-sm text-muted-foreground">
        <span>On Hold: ৳{formatMoney(Number(wallet?.holdBalance ?? 0))}</span>
        <span>Wallet #{wallet?.walletNumber}</span>
      </div>
    </div>
  );
}
