"use client"

import { cn } from "@/lib/utils"

interface TogglePillProps {
  items: readonly string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TogglePill({ items, value, onChange, className }: TogglePillProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const isActive = value === item
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-medium whitespace-nowrap transition-colors border select-none",
              isActive
                ? "bg-foreground border-foreground text-background"
                : "bg-card border-border text-muted-foreground hover:border-primary hover:bg-muted"
            )}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
