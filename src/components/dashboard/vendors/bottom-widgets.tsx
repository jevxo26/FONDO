import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BottomWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <p className="text-sm">NEW ONBOARDING</p>
        <h4 className="text-3xl font-bold text-success">+12 <span className="text-sm font-normal text-muted-foreground">this week</span></h4>
      </Card>
      
      <Card className="p-6">
        <p className="text-sm">QUALITY ALERTS</p>
        <h4 className="text-3xl font-bold text-destructive">03 <span className="text-sm font-normal text-muted-foreground">active cases</span></h4>
      </Card>

      <div className="bg-foreground text-background p-6 rounded-xl flex flex-col justify-between">
        <div>
          <h4 className="font-bold">EXPANSION STRATEGY</h4>
          <p className="text-sm opacity-80 mt-2">We've identified a 22% gap in the Mirpur region for Mughal street food.</p>
        </div>
        <Button variant="secondary" className="mt-4 w-full">ANALYZE ZONES</Button>
      </div>
    </div>
  );
}