"use client";

import React from "react";
import {
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: number;
  type: "order" | "payment" | "user" | "alert" | "delivery" | "food";
  text: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RecentActivityProps {
  activities?: Activity[];
  className?: string;
  isLoading?: boolean;
}

const iconConfig: Record<string, { bg: string; color: string }> = {
  order: { bg: "bg-primary/10", color: "text-primary" },
  payment: { bg: "bg-success/10", color: "text-success" },
  user: { bg: "bg-blue-500/10", color: "text-blue-500" },
  alert: { bg: "bg-destructive/10", color: "text-destructive" },
  delivery: { bg: "bg-purple-500/10", color: "text-purple-500" },
  food: { bg: "bg-orange-500/10", color: "text-orange-500" },
};

export function RecentActivity({ activities, className, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] p-6",
          className,
        )}
      >
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading activity...</div>
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] p-6",
          className,
        )}
      >
        <div className="flex h-[200px] flex-col items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">No recent activity</p>
          <p className="text-xs text-muted-foreground/60">
            Activity will appear here once orders are placed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-foreground">Recent Activity</h3>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>

        <div className="mt-5 flex max-h-[400px] flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20">
          {activities.map((activity) => {
            const cfg = iconConfig[activity.type] || {
              bg: "bg-muted",
              color: "text-muted-foreground",
            };
            return (
              <div
                key={activity.id}
                className="group/activity flex items-start gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-primary/5"
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${cfg.bg} ring-1 ring-primary/5`}
                >
                  <activity.icon className={`size-4 ${cfg.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground leading-relaxed">{activity.text}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <Clock className="size-3 text-primary/50" />
                    <span className="text-[11px] text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
