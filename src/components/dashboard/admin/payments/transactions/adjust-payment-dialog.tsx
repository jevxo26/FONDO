"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { useAdjustPayment } from "@/store/api/slices/admin-payments-api";
import { handleApiError } from "@/lib/api-error";
import type { Payment } from "@/types/payment";

interface AdjustPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
}

const TYPES = [
  { value: "correction", label: "Correction" },
  { value: "chargeback", label: "Chargeback" },
  { value: "bonus", label: "Bonus" },
] as const;

export function AdjustPaymentDialog({ open, onOpenChange, payment }: AdjustPaymentDialogProps) {
  const adjust = useAdjustPayment();
  const [adjustmentType, setAdjustmentType] = useState<(typeof TYPES)[number]["value"]>("correction");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const submit = async () => {
    if (adjust.isPending || !payment) return;
    const amt = Number(amount);
    if (!amt || amt <= 0 || !reason.trim()) return;

    try {
      await adjust.mutateAsync({ paymentId: payment.id, adjustmentType, amount: amt, reason: reason.trim() });
      toast.success("Payment adjusted");
      onOpenChange(false);
      setAmount("");
      setReason("");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Payment</DialogTitle>
          <DialogDescription>
            {payment ? `Apply an adjustment to ${payment.paymentNumber}` : "Apply an adjustment to a payment."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <FormField label="Adjustment Type" required>
            <select
              value={adjustmentType}
              onChange={(e) => setAdjustmentType(e.target.value as (typeof TYPES)[number]["value"])}
              className={inputStyles}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Amount" required>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={inputStyles}
            />
          </FormField>
          <FormField label="Reason" required>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this adjustment being applied?"
              className={inputStyles}
            />
          </FormField>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            onClick={submit}
            disabled={adjust.isPending || !amount || !reason.trim()}
          >
            {adjust.isPending && <Loader2 className="mr-1 size-4 animate-spin" />}
            Apply Adjustment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
