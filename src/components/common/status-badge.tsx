import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  },
);

type StatusBadgeProps = ComponentProps<"span"> & VariantProps<typeof statusBadgeVariants>;

export function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return <span className={cn(statusBadgeVariants({ variant }), className)} {...props} />;
}

export { statusBadgeVariants };