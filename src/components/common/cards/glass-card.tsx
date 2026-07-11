import { cn } from "@/lib/utils";

interface GlassCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  layout?: "row" | "stack";
  valueClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export function GlassCard({
  icon,
  iconBg,
  title,
  value,
  subtitle,
  layout = "row",
  valueClassName,
  subtitleClassName,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-border/30 bg-white/70 p-4 backdrop-blur-sm md:p-6",
        layout === "row" ? "min-h-48" : "min-h-44",
        className,
      )}
    >
      <div>
        <div className={`mb-4 flex size-10 items-center justify-center rounded-lg ${iconBg}`}>
          {icon}
        </div>
        <h3
          className={cn(
            "font-fraunces leading-tight text-foreground",
            layout === "row" ? "text-xl" : "text-lg",
          )}
        >
          {title}
        </h3>
      </div>
      {layout === "row" ? (
        <div className="flex items-baseline gap-2">
          <span className={cn("font-fraunces text-[32px]", valueClassName)}>{value}</span>
          <span className={cn("text-sm font-bold", subtitleClassName)}>{subtitle}</span>
        </div>
      ) : (
        <div>
          <p className={cn("font-fraunces text-[28px]", valueClassName)}>{value}</p>
          <p className={cn("mt-1 text-sm", subtitleClassName)}>{subtitle}</p>
        </div>
      )}
    </div>
  );
}
