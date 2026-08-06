"use client";

import { Suspense } from "react";
import FoodsHero from "@/components/foods/components/foods-hero";
import { FoodsProvider } from "@/components/foods/components/foods-provider";
import FoodsWorkspace from "@/components/foods/components/foods-workspace";

export default function AllFoodsPage() {
  return (
    <Suspense fallback={null}>
      <FoodsProvider>
        {/* Hero */}
        <FoodsHero />
        {/* Catalog matrix */}
        <FoodsWorkspace />
      </FoodsProvider>
    </Suspense>
  );
}
