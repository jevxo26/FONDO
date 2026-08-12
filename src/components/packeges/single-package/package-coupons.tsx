// /components/package/package-coupons.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Copy, Check, Percent, Calendar, Users, Sparkles } from "lucide-react";
import { mockCoupons } from "@/data/mock-coupons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PackageCouponsProps {
  packageId: string;
  packagePrice: number;
  isSubscription?: boolean;
}

export function PackageCoupons({ packageId, packagePrice, isSubscription }: PackageCouponsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const applicableCoupons = mockCoupons.filter((coupon) => {
    if (coupon.status !== "ACTIVE") return false;

    // Check if coupon applies to packages
    if (coupon.appliesTo === "PACKAGES" && !coupon.packageIds?.includes(packageId)) return false;
    if (coupon.appliesTo === "SUBSCRIPTION" && !isSubscription) return false;
    if (coupon.minimumOrder && packagePrice < coupon.minimumOrder) return false;
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
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Gift className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">No package offers available</p>
          <p className="text-xs text-muted-foreground">Check back for new deals</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-fraunces text-lg font-semibold flex items-center gap-2">
        <Gift className="h-5 w-5 text-foreground" />
        Package Offers
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          ({applicableCoupons.length})
        </span>
      </h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {applicableCoupons.map((coupon) => {
          const isCopied = copiedId === coupon.id;
          const discountText =
            coupon.discountType === "PERCENTAGE"
              ? `${coupon.discountValue}% OFF`
              : `$${coupon.discountValue} OFF`;

          return (
            <Card key={coupon.id} className="overflow-hidden border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-[10px] uppercase">
                        {coupon.appliesTo === "SUBSCRIPTION" ? "Subscription" : "Package"}
                      </Badge>
                      {coupon.badge && (
                        <Badge variant="outline" className="text-[10px] uppercase">
                          {coupon.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 font-medium">{coupon.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {coupon.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{discountText}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1">
                  <code className="flex-1 font-mono text-xs font-semibold tracking-wider">
                    {coupon.code}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleCopyCode(coupon.code, coupon.id)}
                  >
                    {isCopied ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {coupon.minimumOrder && (
                    <span className="flex items-center gap-1">
                      <span>Min. ${coupon.minimumOrder}</span>
                    </span>
                  )}
                  {coupon.usageLimit && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {coupon.usedCount}/{coupon.usageLimit}
                    </span>
                  )}
                  {coupon.expiry && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(coupon.expiry).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <Button size="sm" className="mt-3 w-full gap-2">
                  <Sparkles className="h-3 w-3" />
                  Apply Coupon
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
