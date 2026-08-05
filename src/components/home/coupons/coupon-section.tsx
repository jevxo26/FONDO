// /components/home/coupon-section.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, Tag, Clock, Users, Gift, Percent, ArrowRight, Sparkles } from "lucide-react";
import { mockCoupons, type Coupon } from "@/data/mock-coupons";
import { toast } from "sonner";
import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal } from "@/components/common/section-reveal";

interface CouponSectionProps {
  limit?: number;
  variant?: "featured" | "all";
  title?: string;
  description?: string;
  showViewAll?: boolean;
}

export function CouponSection({
  limit = 4,
  variant = "featured",
  title = "Exclusive Offers",
  description = "Save big with exclusive deals and discounts",
  showViewAll = true,
}: CouponSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const featuredCoupons = mockCoupons
    .filter((c) => c.status === "ACTIVE" && c.isFeatured)
    .slice(0, limit);

  const allCoupons = mockCoupons.filter((c) => c.status === "ACTIVE").slice(0, limit);

  const coupons = variant === "featured" ? featuredCoupons : allCoupons;

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative py-8 lg:py-12">
      <div className="wrapper">
        <SectionReveal distance={20}>
          <div className="flex items-center justify-between">
            <SectionHeader title={title} description={description} align="left" />
            {showViewAll && (
              <Button variant="ghost" className="gap-2 text-sm shrink-0">
                View All Offers
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onCopy={handleCopyCode}
                copiedId={copiedId}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

interface CouponCardProps {
  coupon: Coupon;
  onCopy: (code: string, id: string) => void;
  copiedId: string | null;
}

function CouponCard({ coupon, onCopy, copiedId }: CouponCardProps) {
  const isCopied = copiedId === coupon.id;
  const isExpiringSoon =
    coupon.expiry && new Date(coupon.expiry) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
      <CardContent className="p-5">
        {/* Badge */}
        {coupon.badge && (
          <Badge
            variant={
              coupon.badge === "NEW"
                ? "default"
                : coupon.badge === "HOT"
                  ? "destructive"
                  : "outline"
            }
            className="absolute right-3 top-3 text-[10px] uppercase tracking-wider"
          >
            {coupon.badge}
          </Badge>
        )}

        {/* Discount */}
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {coupon.discountType === "PERCENTAGE" ? (
              <Percent className="h-6 w-6" />
            ) : (
              <Tag className="h-6 w-6" />
            )}
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              {coupon.discountType === "PERCENTAGE"
                ? `${coupon.discountValue}%`
                : `$${coupon.discountValue}`}
            </p>
            <p className="text-xs text-muted-foreground">OFF</p>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-medium">{coupon.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{coupon.description}</p>

        {/* Code */}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
          <code className="flex-1 font-mono text-sm font-semibold tracking-wider">
            {coupon.code}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => onCopy(coupon.code, coupon.id)}
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {/* Details */}
        <div className="mt-3 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
          {coupon.minimumOrder && (
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Min. ${coupon.minimumOrder}
            </span>
          )}
          {coupon.usageLimit && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {coupon.usedCount}/{coupon.usageLimit}
            </span>
          )}
          {isExpiringSoon && (
            <span className="flex items-center gap-1 text-destructive">
              <Clock className="h-3 w-3" />
              Expiring soon
            </span>
          )}
          {coupon.appliesTo && (
            <span className="flex items-center gap-1">
              <Gift className="h-3 w-3" />
              {coupon.appliesTo}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1 gap-2">
            Apply Now
            <Sparkles className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            Terms
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
