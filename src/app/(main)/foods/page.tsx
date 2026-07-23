"use client";

import FoodsHero from "@/components/foods/components/foods-hero";
import { FoodsProvider } from "@/components/foods/components/foods-provider";
import FoodsWorkspace from "@/components/foods/components/foods-workspace";
import { useGetFoods } from "@/hooks/use-foods";
import FoodsLoading from "./loading";

export default function AllFoodsPage() {
  const { isLoading } = useGetFoods();
  if(isLoading) return <FoodsLoading></FoodsLoading>
  return (
    <FoodsProvider>
      <main className="min-h-screen bg-background text-foreground">
        {/* Section 1: Advanced Search Top Panel View */}
        <FoodsHero />
        {/* Section 2: Core Matrix Database Feed Hub */}
        <FoodsWorkspace />
      </main>
    </FoodsProvider>
  );
}
