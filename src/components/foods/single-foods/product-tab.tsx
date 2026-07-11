"use client";

import { useState } from "react";
import { Food } from "@/types/food";
import { mockFoodRating } from "@/data/review";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DescriptionTab from "./description-tab";
import ReviewsTab from "./reviews-tab";
import QaTab from "./qa-tab";

export function ProductTabs({ food }: { food: Food }) {
  const [activeTab, setActiveTab] = useState("qa");
  const ratingData = mockFoodRating;

  const tabTriggerClass =
    "rounded-xl bg-white border border-border text-muted-foreground " +
    "data-active:bg-primary data-active:text-primary-foreground data-active:border-primary data-active:shadow-sm " +
    "h-auto py-3 text-sm font-medium";

  return (
    <section className="py-6 bg-background">
      <div className="wrapper">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 gap-4 bg-transparent p-0 h-auto">
            <TabsTrigger value="details" className={tabTriggerClass}>
              Details
            </TabsTrigger>
            <TabsTrigger value="reviews" className={tabTriggerClass}>
              Reviews (3)
            </TabsTrigger>
            <TabsTrigger value="qa" className={tabTriggerClass}>
              Questions and Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="mt-6 rounded-3xl border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card"
          >
            <DescriptionTab food={food} />
          </TabsContent>
          <TabsContent
            value="reviews"
            className="mt-6 rounded-3xl border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card"
          >
            <ReviewsTab ratingData={ratingData} />
          </TabsContent>
          <TabsContent
            value="qa"
            className="mt-6 rounded-3xl border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card"
          >
            <QaTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
