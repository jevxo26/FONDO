"use client";

import FoodsHero from "@/components/foods/components/foods-hero";
import { FoodsProvider } from "@/components/foods/components/foods-provider";
import FoodsWorkspace from "@/components/foods/components/foods-workspace";

export default function AllFoodsPage() {
  return (
    <FoodsProvider>
      <main className="min-h-screen bg-foreground text-black">
        {/* Section 1: Advanced Search Top Panel View */}
        <FoodsHero />
        {/* Section 2: Core Matrix Database Feed Hub */}
        <FoodsWorkspace />
      </main>
    </FoodsProvider>
  );
}
