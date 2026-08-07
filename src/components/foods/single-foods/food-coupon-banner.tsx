// /components/foods/single-foods/food-coupon-banner.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Check } from "lucide-react";
import { mockCoupons } from "@/data/mock-coupons";
import { toast } from "sonner";

interface FoodCouponBannerProps {
  foodId: string;
  foodPrice: number;
}

export function FoodCouponBanner({ foodId, foodPrice }: FoodCouponBannerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const bestCoupon = mockCoupons
    .filter((c) => {
      if (c.status !== "ACTIVE") return false;
      if (c.appliesTo === "FOODS" && !c.foodIds?.includes(foodId)) return false;
      if (c.minimumOrder && foodPrice < c.minimumOrder) return false;
      return true;
    })
    .sort((a, b) => b.discountValue - a.discountValue)[0];

  if (!bestCoupon) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(bestCoupon.code);
    setCopiedId(bestCoupon.id);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isCopied = copiedId === bestCoupon.id;

  return (
    <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Gift className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">
            Save{" "}
            {bestCoupon.discountType === "PERCENTAGE"
              ? `${bestCoupon.discountValue}%`
              : `$${bestCoupon.discountValue}`}
          </p>
          <p className="text-sm text-muted-foreground">
            Use code: <span className="font-mono font-semibold">{bestCoupon.code}</span>
          </p>
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={handleCopy}>
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
