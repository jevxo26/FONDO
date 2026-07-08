import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        align === "left" && "items-start",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "left" && "w-full"
        )}
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-fraunces text-3xl text-foreground sm:text-4xl lg:text-[40px]">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground lg:text-base">
              {description}
            </p>
          )}
        </div>
        {action && <div className="ml-auto shrink-0">{action}</div>}
      </div>
      <Separator className="mt-2" />
    </div>
  );
}
