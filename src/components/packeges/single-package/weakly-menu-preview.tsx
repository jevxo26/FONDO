"use client";

import React, { useMemo, useState, useEffect } from "react";

interface Props {
  days: any[];
}

export default function WeeklyMenuPreview({ days }: Props) {
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    if (days?.length) {
      setActiveDay(days[0].dayNumber);
    }
  }, [days]);

  const selectedDay = useMemo(() => {
    return days?.find((day) => day.dayNumber === activeDay);
  }, [days, activeDay]);

  return (
    <section className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl text-foreground">
            Weekly Menu Manifest
          </h2>

          <p className="text-[11px] text-muted-foreground/70">
            Explore your meal schedule day by day.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 bg-background border border-border/30 p-1 rounded-xl">
          {days?.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.dayNumber)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDay === day.dayNumber
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Day Title */}
      <div>
        <h3 className="font-heading text-lg">
          {selectedDay?.title || `Day ${activeDay}`}
        </h3>

        {selectedDay?.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {selectedDay.description}
          </p>
        )}
      </div>

      {/* Meals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedDay?.meals?.map((meal: any) => (
          <div
            key={meal.id}
            className="bg-background border border-border/20 rounded-xl p-4 flex flex-col gap-4"
          >
            <div>
              <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {meal.mealType}
              </span>

              <h4 className="font-heading text-sm font-medium mt-3">
                {meal.mealTime}
              </h4>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-[11px] font-semibold mb-2">
                Foods ({meal.foods?.length || 0})
              </p>

              {meal.foods?.length ? (
                <ul className="space-y-1">
                  {meal.foods.map((food: any, index: number) => (
                    <li
                      key={food.id}
                      className="text-xs text-muted-foreground flex justify-between"
                    >
                      <span>Food #{index + 1}</span>

                      <span>x{food.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No foods assigned.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}