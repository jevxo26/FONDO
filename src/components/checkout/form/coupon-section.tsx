import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Loader2, Tag, X } from "lucide-react";

interface Props {
  appliedCoupon: string | null;
  couponInput: string;
  savings: number;
  isPending: boolean;
  onCouponChange: (val: string) => void;
  onApply: () => void;
  onRemove: () => void;
}

export function CouponSection({
  appliedCoupon,
  couponInput,
  savings,
  isPending,
  onCouponChange,
  onApply,
  onRemove,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-border/40 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          <Tag className="size-4 text-muted-foreground" />
          <span className="font-sans text-sm font-medium text-foreground">
            {appliedCoupon ? `Coupon: ${appliedCoupon}` : "Have a coupon?"}
          </span>
          {savings > 0 && <span className="text-xs text-primary">-৳{savings}</span>}
        </div>
        {open ? (
          <ChevronUp className="size-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4">
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-primary" />
                <span className="font-sans text-sm font-semibold text-primary">
                  {appliedCoupon}
                </span>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="p-1 hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <X className="size-4 text-destructive" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => onCouponChange(e.target.value)}
                className="flex-1 h-8 text-xs"
              />
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={onApply}
                disabled={isPending || !couponInput.trim()}
                className="shrink-0 h-8"
              >
                {isPending ? <Loader2 className="size-3 animate-spin" /> : "Apply"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
