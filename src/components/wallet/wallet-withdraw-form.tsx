"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import type { WithdrawPayload } from "@/types/wallet";

interface WalletWithdrawFormProps {
  onWithdraw: (payload: WithdrawPayload) => void;
  isPending: boolean;
}

export function WalletWithdrawForm({ onWithdraw, isPending }: WalletWithdrawFormProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"bank" | "mobile_banking">("bank");
  const [account, setAccount] = useState("");

  const submit = () => {
    const value = Number(amount);
    if (!value || value <= 0 || !account) return;
    onWithdraw({ amount: value, withdrawMethod: method, accountNumber: account });
  };

  return (
    <div className="rounded-3xl border border-border/40 bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
        <ArrowUpRight className="size-4 text-primary" /> Withdraw
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Withdraw funds to your bank or mobile banking.</p>
      <div className="mt-4 space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">৳</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-8 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as "bank" | "mobile_banking")}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="bank">Bank Transfer</option>
          <option value="mobile_banking">Mobile Banking (bKash/Nagad)</option>
        </select>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder={method === "mobile_banking" ? "Mobile number (e.g. 01XXXXXXXXX)" : "Account number"}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={submit}
          disabled={isPending || !Number(amount) || !account}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />} Request Withdrawal
        </button>
      </div>
    </div>
  );
}
