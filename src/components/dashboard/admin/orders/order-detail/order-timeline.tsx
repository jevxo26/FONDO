import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  label: string;
  time: string | null;
  done: boolean;
}

interface OrderTimelineProps {
  timelineItems: TimelineStep[];
}

export default function OrderTimeline({ timelineItems }: OrderTimelineProps) {
  if (timelineItems.length === 0) return null;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
      <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Timeline</h2>
      <div className="space-y-0">
        {timelineItems.map((step, i) => (
          <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                  step.done
                    ? "border-success bg-success/10 text-success"
                    : "border-muted-foreground/30 text-muted-foreground/50",
                )}
              >
                {step.done ? <CheckCircle className="size-4" /> : i + 1}
              </div>
              {i < timelineItems.length - 1 && (
                <div
                  className={cn("mt-0.5 w-0.5 grow", step.done ? "bg-success/40" : "bg-border")}
                />
              )}
            </div>
            <div className="min-w-0 pb-2">
              <p
                className={cn(
                  "text-sm font-medium",
                  step.done ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </p>
              {step.time && <p className="text-xs text-muted-foreground">{step.time}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
