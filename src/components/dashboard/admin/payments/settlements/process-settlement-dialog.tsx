"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { VendorSettlement } from "@/types/wallet";

interface ProcessSettlementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settlement: VendorSettlement | null;
  onProcess: (settlementId: string, data: { transactionId?: string; paymentMethod?: string }) => void;
  isPending: boolean;
}

export function ProcessSettlementDialog({
  open,
  onOpenChange,
  settlement,
  onProcess,
  isPending,
}: ProcessSettlementDialogProps) {
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const submit = () => {
    if (!settlement) return;
    onProcess(settlement.id, {
      transactionId: transactionId || undefined,
      paymentMethod: paymentMethod || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-xl">Process Settlement</DialogTitle>
        </DialogHeader>
        {settlement && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Process settlement <span className="font-mono font-semibold text-foreground">{settlement.settlementNumber}</span> of{" "}
              <span className="font-semibold text-foreground">৳{Number(settlement.netAmount).toLocaleString()}</span> for vendor.
            </p>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Transaction ID (optional)"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="bank">Bank Transfer</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="check">Check</option>
            </select>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending && <Loader2 className="mr-1 size-4 animate-spin" />} Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
