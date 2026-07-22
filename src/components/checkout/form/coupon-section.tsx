import { Input } from "@/components/ui/input";
import { Loader2, Ticket, X } from "lucide-react";

interface Props {
  appliedCoupon: string | null;
  couponInput: string;
  savings: number;
  isPending: boolean;
  onCouponChange: (val: string) => void;
  onApply: () => void;
  onRemove: () => void;
}

export function CouponSection({ appliedCoupon, couponInput, savings, isPending, onCouponChange, onApply, onRemove }: Props) {
  return (
    <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
      <h2 className="font-sans text-base font-semibold text-foreground">Coupon Code</h2>
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2">
            <Ticket className="size-4 text-primary" />
            <span className="font-sans text-sm font-semibold text-foreground">{appliedCoupon}</span>
            {savings > 0 && <span className="text-xs text-success font-medium">-৳{savings}</span>}
          </div>
          <button
            type="button"
            onClick={onRemove}
            disabled={isPending}
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
          <button
            type="button"
            onClick={onApply}
            disabled={isPending || !couponInput.trim()}
            className="px-5 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Ticket className="size-3.5" />}
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
