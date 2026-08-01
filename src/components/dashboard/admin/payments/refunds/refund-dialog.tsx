"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Payment } from "@/types/payment";

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
  onRefund: (paymentId: string, amount: number, reason: string) => void;
  isPending: boolean;
}

export function RefundDialog({ open, onOpenChange, payment, onRefund, isPending }: RefundDialogProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const maxAmount = Number(payment?.amount ?? 0);

  const submit = () => {
    const value = Number(amount);
    if (!value || value <= 0 || !reason) return;
    onRefund(payment!.id, value, reason);
    setAmount("");
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-xl">Issue Refund</DialogTitle>
        </DialogHeader>
        {payment && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Refunding payment <span className="font-mono font-semibold text-foreground">{payment.paymentNumber}</span> for{" "}
              <span className="font-semibold text-foreground">৳{Number(payment.amount).toLocaleString()}</span> (max refundable).
            </p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">৳</span>
              <input
                type="number"
                min="1"
                max={maxAmount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Refund amount"
                className="w-full rounded-xl border border-border bg-background py-2.5 pl-8 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Refund reason"
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={isPending || !Number(amount) || !reason} className="bg-destructive hover:bg-destructive/90">
            {isPending && <Loader2 className="mr-1 size-4 animate-spin" />} Confirm Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
