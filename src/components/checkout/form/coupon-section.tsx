import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Tag, X } from "lucide-react";

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
  return (
    <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm">
      <h2 className="font-sans text-base font-semibold text-foreground mb-4">Coupon Code</h2>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <Tag className="size-4 text-primary" />
            <span className="font-sans text-sm font-semibold text-primary">{appliedCoupon}</span>
            {savings > 0 && <span className="text-xs text-muted-foreground">(-৳{savings})</span>}
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
            className="flex-1"
          />
          <Button
            type="button"
            variant="accent"
            size="sm"
            onClick={onApply}
            disabled={isPending || !couponInput.trim()}
            className="shrink-0"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Apply"}
          </Button>
        </div>
      )}
    </div>
  );
}
