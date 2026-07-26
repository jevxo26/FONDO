"use client";

import React, { useState } from "react";

export default function WeeklyMenuPreview() {
  const [activeDay, setActiveDay] = useState("Mon");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const menuData = {
    Breakfast: { name: "Ancient Grain & Spiced Almond Porridge", cal: "380 kcal" },
    Lunch: { name: "Saffron-Infused Sea Bass with Braised Wild Greens", cal: "560 kcal" },
    Dinner: { name: "Slow-Simmered Lentil & Heirloom Spinach Dal", cal: "440 kcal" }
  };

  return (
    <section className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl text-foreground">Weekly Menu Manifest</h2>
          <p className="text-[11px] text-muted-foreground/70">Explore scheduled ancestral rotations for the current week</p>
        </div>
        {/* Day selection tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 bg-background border border-border/30 p-1 rounded-xl">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDay === day 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground/70 hover:text-foreground"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Meals distribution structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {Object.entries(menuData).map(([mealType, dish]) => (
          <div key={mealType} className="bg-background border border-border/20 rounded-xl p-4 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {mealType}
              </span>
              <h4 className="font-heading text-sm font-medium text-foreground mt-3 leading-snug">{dish.name}</h4>
            </div>
            <div className="text-[11px] font-sans text-muted-foreground/60 text-right border-t border-border/20 pt-2">
              Allocated Energy: <span className="font-bold text-foreground">{dish.cal}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}