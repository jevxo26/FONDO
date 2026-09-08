"use client";

import { useState } from "react";
import { Plus, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TopupPayload } from "@/types/wallet";

interface WalletTopupFormProps {
  onTopup: (payload: TopupPayload) => void;
  isPending: boolean;
}

export function WalletTopupForm({ onTopup, isPending }: WalletTopupFormProps) {
  const [amount, setAmount] = useState("");

  const submit = () => {
    const value = Number(amount);
    if (!value || value <= 0) return;
    onTopup({ amount: value });
  };

  return (
    <div className="rounded-3xl border border-border/40 bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
        <Plus className="size-4 text-foreground" /> Add Money
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Top up your wallet via SSLCommerz.</p>
      <div className="mt-4 flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">৳</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-8 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <Button
          onClick={submit}
          disabled={isPending || !Number(amount)}
          variant="default"
          className="gap-2"
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Top Up
        </Button>
      </div>
    </div>
  );
}
