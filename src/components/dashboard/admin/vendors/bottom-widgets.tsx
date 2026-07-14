import { AlertTriangle, Expand, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { StatCard } from "@/components/dashboard/common/stat-card";

export function BottomWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard label="NEW ONBOARDING" value="+12" variant="success" icon={UserPlus} accent="right" />
      <StatCard label="QUALITY ALERTS" value="03" variant="danger" icon={AlertTriangle} accent="right" />
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
