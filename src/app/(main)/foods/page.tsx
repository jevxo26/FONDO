"use client";

import FoodsHero from "@/components/foods/components/foods-hero";
import { FoodsProvider } from "@/components/foods/components/foods-provider";
import FoodsWorkspace from "@/components/foods/components/foods-workspace";
import { CouponSection } from "@/components/home/coupons/coupon-section";
import { Suspense } from "react";

export default function AllFoodsPage() {
  return (
    <Suspense fallback={null}>
      <FoodsProvider>
        {/* Hero */}
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
      </FoodsProvider>
    </Suspense>
  );
}
