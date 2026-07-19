"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface InfiniteSliderProps {
  children: ReactNode;
  gap?: number;
  speed?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 40,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  return (
    <div
      className={cn("overflow-hidden px-4", className)}
      style={
        {
          "--slide-duration": `${speed}s`,
          "--slide-gap": `${gap}px`,
          "--slide-direction": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex w-max animate-marquee",
          direction === "horizontal" ? "flex-row" : "flex-col",
        )}
        style={{
          gap: `${gap}px`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
