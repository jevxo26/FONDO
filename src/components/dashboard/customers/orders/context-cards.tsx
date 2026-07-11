import { DarkCard } from "@/components/common/cards/dark-card";
import { GlassCard } from "@/components/common/cards/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Timer, TrendingUp } from "lucide-react";

export function ContextCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <GlassCard
        layout="row"
        icon={<TrendingUp className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Daily Peak Volume"
        value="42"
        subtitle="+12% vs yesterday"
        valueClassName="text-foreground"
        subtitleClassName="text-success"
      />
      <GlassCard
        layout="row"
        icon={<Timer className="size-5 text-success" />}
        iconBg="bg-success/10"
        title="Avg. Delivery Time"
        value="34m"
        subtitle="Dhaka Metro Area"
        valueClassName="text-foreground"
        subtitleClassName="text-muted-foreground"
      />
      <DarkCard
        icon={<ChefHat className="size-40" />}
        title="Menu Insights"
        description="Kacchi Biryani is trending this hour."
      >
        <Button variant="link" className="h-auto gap-2 p-0 text-sm font-bold text-white">
          View Analytics <ArrowRight className="size-4" />
        </Button>
      </DarkCard>
    </div>
  );
}
