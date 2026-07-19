"use client";

import { useState } from "react";
import { Food } from "@/types/food";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DescriptionTab from "./description-tab";
import ReviewsTab from "./reviews-tab";
import QaTab from "./qa-tab";
import { useFoodReviews } from "@/hooks/use-review";

export function ProductTabs({ food }: { food: Food }) {
  const [activeTab, setActiveTab] = useState("details");
  const { data } = useFoodReviews(food.id);
  const allReviews = data?.items ?? [];

  const tabTriggerClass =
    "rounded-xl bg-white border border-border text-muted-foreground " +
    "data-active:bg-primary data-active:text-primary-foreground data-active:border-primary data-active:shadow-sm " +
    "h-auto py-2.5 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm font-medium whitespace-nowrap";

  return (
    <section className="py-4 sm:py-6 bg-background">
      <div className="wrapper px-3 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 gap-2 sm:gap-4 bg-transparent p-0 h-auto">
            <TabsTrigger value="details" className={tabTriggerClass}>
              Details
            </TabsTrigger>

            <TabsTrigger value="reviews" className={tabTriggerClass}>
              Reviews ({allReviews.length})
            </TabsTrigger>

            <TabsTrigger value="qa" className={tabTriggerClass}>
              Q&A
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl border border-border/60 bg-white p-4 sm:p-6 shadow-[var(--shadow-card)] dark:bg-card"
          >
            <DescriptionTab food={food} />
          </TabsContent>

          <TabsContent
            value="reviews"
            className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl border border-border/60 bg-white p-4 sm:p-6 shadow-[var(--shadow-card)] dark:bg-card"
          >
            <ReviewsTab foodId={food.id} allReviews={allReviews} />
          </TabsContent>

          <TabsContent
            value="qa"
            className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl border border-border/60 bg-white p-4 sm:p-6 shadow-[var(--shadow-card)] dark:bg-card"
          >
            <QaTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}