"use client";

import { useState } from "react";

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <section className="py-6 bg-background">
      <div className="wrapper">
        {/* Segmented Control Bar */}
        <div className="grid grid-cols-3 gap-4 border-b border-border/40 pb-4">
          {[
            { id: "details", label: "details" },
            { id: "reviews", label: "Reviews (3)" },
            { id: "qa", label: "Questions and answers" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 rounded-xl text-center font-sans text-sm font-medium transition-all duration-200 border select-none
                  ${isActive
                    ? "bg-[#CEA359] border-[#CEA359] text-[#1B0E08] shadow-sm font-semibold"
                    : "bg-white border-border text-muted-foreground hover:bg-muted dark:bg-card"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content Box */}
        <div className="mt-6 rounded-3xl border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card">
          {activeTab === "details" && (
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-base font-semibold text-secondary-foreground">Product Description</h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                This authentic Kacchi Biryani layers tender chunks of premium mutton marinated in a curated blend of aromatic spices with premium extra-long grain aged Basmati rice. Slow-cooked in sealed copper pots to trap all moisture and deep flavor.
              </p>
              
              <h4 className="font-sans text-sm font-semibold text-secondary-foreground mt-2">Key Features:</h4>
              <ul className="list-inside space-y-1.5 font-sans text-sm text-muted-foreground">
                <li>&middot; 100% fresh premium quality mutton chunks</li>
                <li>&middot; Organic saffron and pure kewra water infusions</li>
                <li>&middot; Prepared by authentic heritage chefs native to Old Dhaka</li>
                <li>&middot; Delivered pristine hot inside insulated premium boxing</li>
              </ul>
            </div>
          )}
          {activeTab === "reviews" && <p className="text-sm text-muted-foreground font-sans">Verified customer reviews and star rating spreads render here.</p>}
          {activeTab === "qa" && <p className="text-sm text-muted-foreground font-sans">Community queries and kitchen replies render here.</p>}
        </div>
      </div>
    </section>
  );
}