"use client";

import FoodsHero from "@/components/foods/components/foods-hero";
import { FoodsProvider } from "@/components/foods/components/foods-provider";
import FoodsWorkspace from "@/components/foods/components/foods-workspace";
import { CouponSection } from "@/components/home/coupons/coupon-section";

export default function AllFoodsPage() {
  return (
    <FoodsProvider>
      <main className="min-h-screen bg-background text-foreground">
        {/* Section 1: Advanced Search Top Panel View */}
        <FoodsHero />
        {/* Section 2: Core Matrix Database Feed Hub */}
        <CouponSection
          variant="all"
          limit={6}
          title="Available Coupons"
          description="Save on your favorite foods"
          showViewAll={false}
        />
        <FoodsWorkspace />
      </main>
    </FoodsProvider>
  );
}
