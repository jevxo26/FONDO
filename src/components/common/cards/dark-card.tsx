import { cn } from "@/lib/utils";

interface DarkCardProps {
  icon: React.ReactNode;
  title: string;
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
        "group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-lg md:p-6 lg:p-8",
        variant === "foreground" ? "bg-foreground text-white" : "bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="absolute -bottom-8 -right-8 opacity-20 transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="font-fraunces text-lg leading-tight md:text-xl">{title}</h3>
        {description && <p className="mt-1 text-sm text-white/70 md:mt-2">{description}</p>}
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
