"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useWalletPage } from "@/hooks/use-wallet";
import { WalletBalanceCard } from "@/components/wallet/wallet-balance-card";
import { WalletTopupForm } from "@/components/wallet/wallet-topup-form";
import { WalletWithdrawForm } from "@/components/wallet/wallet-withdraw-form";
import { WalletTransactionList } from "@/components/wallet/wallet-transaction-list";

export default function WalletPage() {
  const {
    wallet,
    transactions,
    isLoading,
    handleTopup,
    handleWithdraw,
    topupPending,
    withdrawPending,
  } = useWalletPage();

  if (isLoading) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-8 lg:py-12">
      <div className="wrapper max-w-5xl space-y-8">
        <Link href="/profile" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Back to Profile
        </Link>
        <h1 className="font-heading text-4xl font-normal text-secondary-foreground tracking-tight">My Wallet</h1>

        <WalletBalanceCard wallet={wallet} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WalletTopupForm onTopup={handleTopup} isPending={topupPending} />
          <WalletWithdrawForm onWithdraw={handleWithdraw} isPending={withdrawPending} />
        </div>

        <div className="rounded-3xl border border-border/40 bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-heading text-lg font-bold text-foreground">Transaction History</h3>
          <WalletTransactionList transactions={transactions} />
        </div>
      </div>
    </main>
  );
}