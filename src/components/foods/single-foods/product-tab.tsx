"use client";

import { useState } from "react";
import { Food } from "@/types/food";
import { mockFoodRating, mockFoodReviews } from "@/data/review";
import { Star } from "lucide-react";
import DescriptionTab from "./description-tab";
import ReviewsTab from "./reviews-tab";
import QaTab from "./qa-tab";

export function ProductTabs({ food }: { food: Food }) {
  const [activeTab, setActiveTab] = useState("qa");
  const ratingData = mockFoodRating;


  return (
    <section className="py-6 bg-background">
      <div className="wrapper">
        {/* Segmented Control Bar */}
        <div className="grid grid-cols-3 gap-4 border-b border-border/40 pb-4">
          {[
            { id: "details", label: "Details" },
            { id: "reviews", label: "Reviews (3)" },
            { id: "qa", label: "Questions and Answers" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 rounded-xl text-center font-sans text-sm font-medium transition-all duration-200 border select-none
                  ${
                    isActive
                      ? "bg-[#CEA359] border-[#CEA359] text-[#1B0E08] shadow-sm font-semibold"
                      : "bg-white border-border text-muted-foreground hover:bg-muted dark:bg-card"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div className="mt-6 rounded-3xl border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card">
          {activeTab === "details" && <DescriptionTab food={food}/>}
          {activeTab === "reviews" && <ReviewsTab ratingData={ratingData}/>}
          {activeTab === "qa" && <QaTab/>}
        </div>
      </div>
    </section>
  );
}