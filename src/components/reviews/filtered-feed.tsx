"use client";

import React, { useState } from "react";
import { Star, Search, ThumbsUp } from "lucide-react";

export default function FilteredFeed() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Lean Nutrition", "Dietary Custom", "Mughal Craft", "Weight Loss"];

  const sampleReviews = [
    { name: "Asif Nehal", initials: "AN", text: "The compliance is unmatched. Every single container delivers the exact macro profile stated on the dashboard grid. The wild herbs and slow-simmered fish recipes changed my perspective on dietary frameworks.", date: "Yesterday" },
    { name: "Maisha Kabir", initials: "MK", text: "Perfect timing cycle execution! Packages arrive exactly at 6:45 AM daily inside sterile eco-cells. Customizing spice tolerances via the engine works flawlessly.", date: "3 days ago" },
    { name: "Zayan Ahmed", initials: "ZA", text: "Truly a premium setup. Paying for the 30-day framework upfront saved time, and the trace mineral retention makes a noticeble difference in physical energy logs.", date: "1 week ago" }
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-t border-border/20 animate-fadeIn">
      <div className="wrapper space-y-8">
        
        {/* Search and Navigation Pill Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider ${
                  activeTab === tab ? "bg-foreground text-background shadow-md" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Search specific reviews..." 
              className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* 3-Column Masonry Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((rev, idx) => (
            <div key={idx} className="bg-card border border-border/60 rounded-2xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground leading-none">{rev.name}</h4>
                      <span className="text-[9px] text-muted-foreground mt-1 block">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-current" />)}
                  </div>
                </div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed pt-2">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 flex justify-between items-center text-[10px] text-muted-foreground">
                <span className="text-success font-bold uppercase tracking-wider bg-success/10 px-2 py-0.5 rounded">Verified Plan</span>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <ThumbsUp className="size-3" /> Helpful (2)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Trigger Action */}
        <div className="text-center pt-4">
          <button className="px-6 py-2.5 bg-transparent border border-border text-foreground hover:bg-card text-xs font-bold rounded-xl transition-all uppercase tracking-widest">
            Load More Reviews
          </button>
        </div>

      </div>
    </section>
  );
}