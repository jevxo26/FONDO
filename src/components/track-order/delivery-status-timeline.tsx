"use client";

import type { LucideIcon } from "lucide-react";

interface Step {
  label: string;
  completed: boolean;
  icon: LucideIcon;
}

interface DeliveryStatusTimelineProps {
  steps: Step[];
}

export default function DeliveryStatusTimeline({ steps }: DeliveryStatusTimelineProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h2 className="font-heading text-lg font-normal text-foreground mb-6">Delivery Status</h2>
      <div className="space-y-6">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start gap-4">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <step.icon className="size-4" />
            </div>
            <div className="pt-1.5">
              <p
                className={`text-sm font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className={`ml-4 h-8 w-0.5 ${step.completed ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
