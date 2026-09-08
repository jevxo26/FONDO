// /components/food/food-coupons.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Copy, Check, Tag } from "lucide-react";
import { mockCoupons, type Coupon } from "@/data/mock-coupons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FoodCouponsProps {
  foodId: string;
  foodPrice: number;
}

export function FoodCoupons({ foodId, foodPrice }: FoodCouponsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter coupons applicable to this food
  const applicableCoupons = mockCoupons.filter((coupon) => {
    if (coupon.status !== "ACTIVE") return false;
    if (coupon.appliesTo === "FOODS" && !coupon.foodIds?.includes(foodId)) return false;
    if (coupon.minimumOrder && foodPrice < coupon.minimumOrder) return false;
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return false;
    if (coupon.expiry && new Date(coupon.expiry) < new Date()) return false;
    return true;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (applicableCoupons.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Tag className="h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium">No coupons available</p>
          <p className="text-sm text-muted-foreground">Check back later for new offers</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-lg font-semibold">
        Available Coupons
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({applicableCoupons.length})
        </span>
      </h3>

      <div className="space-y-3">
        {applicableCoupons.map((coupon) => (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            onCopy={handleCopyCode}
            copiedId={copiedId}
            isApplicable={true}
          />
        ))}
      </div>
    </div>
  );
}

interface CouponItemProps {
  coupon: Coupon;
  onCopy: (code: string, id: string) => void;
  copiedId: string | null;
  isApplicable: boolean;
  reason?: string;
}

function CouponItem({ coupon, onCopy, copiedId, isApplicable, reason }: CouponItemProps) {
  const isCopied = copiedId === coupon.id;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-4 transition-all",
        isApplicable
          ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20"
          : "border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-950/20 opacity-70",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "rounded-full p-2",
            isApplicable ? "bg-success/10" : "bg-destructive/10",
          )}
        >
          {isApplicable ? (
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{coupon.title}</p>
            <Badge variant="outline" className="text-[10px] uppercase">
              {coupon.discountType === "PERCENTAGE"
                ? `${coupon.discountValue}% OFF`
                : `$${coupon.discountValue} OFF`}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">{coupon.description}</p>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold">
              {coupon.code}
            </code>
            {coupon.minimumOrder && <span>Min. ${coupon.minimumOrder}</span>}
            {!isApplicable && reason && <span className="text-destructive">{reason}</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Button
          variant={isApplicable ? "default" : "outline"}
          size="sm"
          className="h-8 gap-1 text-xs"
          disabled={!isApplicable}
        >
          {isApplicable ? "Apply" : "Unavailable"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={() => onCopy(coupon.code, coupon.id)}
        >
          {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
