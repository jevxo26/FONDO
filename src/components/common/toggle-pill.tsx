"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TogglePillProps {
  items: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TogglePill({ items, value, onChange, className }: TogglePillProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const isActive = value === item;
        return (
          <Button
            key={item}
            variant="outline"
            size="sm"
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "rounded-full px-5 font-medium whitespace-nowrap",
              isActive
                ? "bg-foreground border-foreground text-background"
                : "bg-card border-border text-muted-foreground hover:border-primary hover:bg-muted",
            )}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
}
