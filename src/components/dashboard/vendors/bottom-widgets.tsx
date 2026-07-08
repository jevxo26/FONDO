import { DarkCard } from "@/components/common/cards/dark-card";
import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BottomWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-4 md:p-6">
        <p className="text-[13px] text-muted-foreground">NEW ONBOARDING</p>
        <h4 className="mt-1 font-fraunces text-3xl font-bold text-success">
          +12
          <span className="ml-1 text-sm font-normal text-muted-foreground">this week</span>
        </h4>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 md:p-6">
        <p className="text-[13px] text-muted-foreground">QUALITY ALERTS</p>
        <h4 className="mt-1 font-fraunces text-3xl font-bold text-destructive">
          03
          <span className="ml-1 text-sm font-normal text-muted-foreground">active cases</span>
        </h4>
      </div>

      <DarkCard
        icon={<Expand className="size-32" />}
        title="Expansion Strategy"
        description="We've identified a 22% gap in the Mirpur region for Mughal street food."
      >
        <Button variant="secondary" className="w-full rounded-full">
          ANALYZE ZONES
        </Button>
      </DarkCard>
    </div>
  );
}
