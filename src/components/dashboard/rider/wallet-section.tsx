"use client";

import { Wallet, Lock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RiderWallet, WalletTransaction } from "@/data/riders";
import { TransactionTable } from "./transaction-table";

interface WalletSectionProps {
  balance: RiderWallet;
  transactions: WalletTransaction[];
}

export function WalletSection({ balance, transactions }: WalletSectionProps) {
  return (
    <div>
      <h3 className="font-fraunces text-lg font-semibold text-foreground">Wallet</h3>
      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Wallet className="size-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Available Balance</p>
              <p className="font-fraunces text-3xl font-bold text-foreground">
                ৳{balance.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-warning/10 via-card to-warning/[0.04] p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-warning/10 text-warning ring-1 ring-warning/20">
              <Lock className="size-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">On Hold</p>
              <p className="font-fraunces text-3xl font-bold text-foreground">
                ৳{balance.holdBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className={cn(
          "rounded-3xl bg-gradient-to-br from-success/10 via-card to-success/[0.04] p-6 shadow-[var(--shadow-card)]",
          "flex cursor-pointer items-center gap-3 transition-all hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]",
        )}>
          <div className="flex size-12 items-center justify-center rounded-xl bg-success/10 text-success ring-1 ring-success/20">
            <ArrowUpRight className="size-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Withdraw</p>
            <p className="font-fraunces text-xl font-bold text-foreground">Transfer to Bank</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-fraunces text-base font-semibold text-foreground">Transaction History</h4>
        <TransactionTable data={transactions} />
      </div>
    </div>
  );
}
