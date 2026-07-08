import { TrendingUp, Timer, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContextCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <GlassCard
        icon={<TrendingUp className="size-5 text-primary" />}
        iconBg="bg-primary/10"
        title="Daily Peak Volume"
        value="42"
        subtitle="+12% vs yesterday"
        valueClassName="text-foreground"
        subtitleClassName="text-success"
      />
      <GlassCard
        icon={<Timer className="size-5 text-success" />}
        iconBg="bg-success/10"
        title="Avg. Delivery Time"
        value="34m"
        subtitle="Dhaka Metro Area"
        valueClassName="text-foreground"
        subtitleClassName="text-muted-foreground"
      />
      <DarkCard />
    </div>
  );
}

function GlassCard({
  icon,
  iconBg,
  title,
  value,
  subtitle,
  valueClassName,
  subtitleClassName,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  valueClassName: string;
  subtitleClassName: string;
}) {
  return (
    <div className="flex h-48 flex-col justify-between rounded-xl border border-border/30 bg-white/70 p-6 backdrop-blur-sm">
      <div>
        <div
          className={`mb-4 flex size-10 items-center justify-center rounded-lg ${iconBg}`}
        >
          {icon}
        </div>
        <h3 className="font-fraunces text-xl leading-tight text-foreground">
          {title}
        </h3>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`font-fraunces text-[32px] ${valueClassName}`}>
          {value}
        </span>
        <span className={`text-sm font-bold ${subtitleClassName}`}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}

function DarkCard() {
  return (
    <div className="group relative flex h-48 flex-col justify-between overflow-hidden rounded-xl bg-foreground p-6 text-white shadow-lg">
      <div className="absolute -bottom-10 -right-10 opacity-20 transition-transform duration-500 group-hover:scale-110">
        <ChefHat className="size-40" />
      </div>
      <div className="relative z-10">
        <h3 className="font-fraunces text-xl leading-tight">Menu Insights</h3>
        <p className="mt-2 text-sm text-white/70">
          Kacchi Biryani is trending this hour.
        </p>
      </div>
      <div className="relative z-10">
        <Button variant="link" className="h-auto gap-2 p-0 text-sm font-bold">
          View Analytics <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
