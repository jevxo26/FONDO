"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface FormTab {
  value: string;
  label: string;
  icon: LucideIcon;
  completed?: boolean;
  error?: boolean;
}

interface FormTabsProps {
  tabs: FormTab[];
  content: Record<string, ReactNode>;
  defaultValue?: string;
  active?: string;
  onActiveChange?: (tab: string) => void;
  className?: string;
}

export function FormTabs({
  tabs,
  content,
  defaultValue,
  active: activeProp,
  onActiveChange,
  className,
}: FormTabsProps) {
  const [activeState, setActiveState] = useState(defaultValue ?? tabs[0]?.value ?? "");
  const active = activeProp ?? activeState;
  const setActive = onActiveChange ?? setActiveState;
  const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex gap-2 overflow-x-auto rounded-2xl border border-border/40 bg-muted/50 p-1.5 shadow-[var(--shadow-card)]"
      >
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab?.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.value)}
              className={cn(
                "group relative flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-300 active:scale-[0.97]",
                tab.error && "border-destructive/40",
                isActive
                  ? "border-primary/40 bg-card text-foreground shadow-sm"
                  : "border-transparent bg-transparent text-muted-foreground hover:bg-card/70 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                  tab.error && !isActive
                    ? "bg-destructive/10 text-destructive group-hover:bg-destructive/15"
                    : undefined,
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/15",
                )}
              >
                <tab.icon className="size-4" />
              </span>
              {tab.label}
              {tab.error ? (
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full",
                    isActive
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-destructive/15 text-destructive",
                  )}
                  title="This tab has invalid fields"
                >
                  <AlertCircle className="size-3" />
                </span>
              ) : (
                tab.completed && (
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <Check className="size-3" />
                  </span>
                )
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab?.value;
          return (
            <motion.div
              key={tab.value}
              style={{ display: isActive ? undefined : "none" }}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            >
              {content[tab.value]}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
