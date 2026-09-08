import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp, Loader2, Tag, X, Percent, TicketCheck } from "lucide-react";

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
    <div className="rounded-2xl bg-card border border-border/40 shadow-sm overflow-hidden transition-all duration-300">
      <Button
        type="button"
        onClick={() => setOpen(!open)}
        variant="ghost"
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className={`flex size-8 items-center justify-center rounded-lg ${appliedCoupon ? "bg-primary/10" : "bg-muted"}`}>
            {appliedCoupon ? <TicketCheck className="size-4 text-primary" /> : <Tag className="size-4 text-muted-foreground" />}
          </div>
          <div className="text-left">
            <span className="font-sans text-sm font-medium text-foreground">
              {appliedCoupon ? `Coupon: ${appliedCoupon}` : "Have a coupon?"}
            </span>
            {savings > 0 && (
              <span className="ml-2 text-xs font-semibold text-primary">-৳{savings}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Percent className="size-3.5 text-muted-foreground/60" />
          {open ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </div>
      </Button>

      {open && (
        <div className="px-4 pb-4 border-t border-border/40 pt-3">
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-gradient-to-r from-primary/8 to-primary/3 border border-primary/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2.5">
                <TicketCheck className="size-4 text-primary" />
                <div>
                  <span className="font-sans text-sm font-semibold text-primary">
                    {appliedCoupon}
                  </span>
                  {savings > 0 && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      You saved ৳{savings} with this coupon
                    </p>
                  )}
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    onClick={onRemove}
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-lg hover:bg-destructive/10"
                  >
                    <X className="size-4 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove coupon</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => onCouponChange(e.target.value)}
                  className="pl-9 h-9 text-xs flex-1"
                />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    variant="accent"
                    size="sm"
                    onClick={onApply}
                    disabled={isPending || !couponInput.trim()}
                    className="shrink-0 h-9"
                  >
                    {isPending ? <Loader2 className="size-3 animate-spin" /> : "Apply"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Apply coupon code</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
