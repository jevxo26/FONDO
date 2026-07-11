import { cn } from "@/lib/utils";

interface DarkCardProps {
  icon: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: "foreground" | "primary";
  className?: string;
}

export function DarkCard({
  icon,
  title,
  description,
  children,
  variant = "foreground",
  className,
}: DarkCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:p-6 lg:p-8",
          variant === "foreground"
            ? "bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] text-white"
            : "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground",
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-primary/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5 rounded-t-3xl bg-primary shadow-[0_2px_8px_rgba(206,163,89,0.25)]" />
        <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/40" />
        <div className="pointer-events-none absolute -bottom-8 -right-8 flex size-48 items-center justify-center opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30">
          {icon}
        </div>
        <div className="pointer-events-none absolute -top-4 -right-4 size-24 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-4 -left-4 size-20 rounded-full bg-white/8 blur-2xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        {title && (
          <div className="relative z-10">
            <h3 className="font-fraunces text-lg leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:text-xl">
              {title}
            </h3>
            {description && <p className="mt-1 text-sm text-white/70 md:mt-2">{description}</p>}
          </div>
        )}
        {children && <div className={cn("relative z-10", title && "mt-4")}>{children}</div>}
      </div>
    </div>
  );
}
