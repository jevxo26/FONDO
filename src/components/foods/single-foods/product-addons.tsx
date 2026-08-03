"use client";

import type { Addon, AddonItem } from "@/types/food";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductAddonsProps {
  addons: Addon[];
  selected: Record<string, AddonItem[]>;
  onChange: (addonId: string, items: AddonItem[]) => void;
}

export function ProductAddons({ addons, selected, onChange }: ProductAddonsProps) {
  if (!addons || addons.length === 0) return null;

  const toggleItem = (addon: Addon, item: AddonItem) => {
    const current = selected[addon.id] ?? [];
    const exists = current.some((i) => i.id === item.id);
    if (exists) {
      onChange(addon.id, current.filter((i) => i.id !== item.id));
      return;
    }
    const maxSelection = addon.maxSelection ?? 0;
    if (maxSelection > 0 && current.length >= maxSelection) return;
    onChange(addon.id, [...current, item]);
  };

  return (
    <div className="mt-6 space-y-4">
      {addons.map((addon) => {
        const current = selected[addon.id] ?? [];
        const maxSelection = addon.maxSelection ?? 0;
        const isMaxed = maxSelection > 0 && current.length >= maxSelection;

        return (
          <div key={addon.id} className="rounded-2xl border border-border/60 bg-card p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-sans text-sm font-semibold text-foreground">{addon.name}</h4>
              {addon.isRequired ? (
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                  Required
                </span>
              ) : (
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Optional
                </span>
              )}
            </div>

            {addon.isRequired && current.length === 0 && (
              <p className="mt-1 text-[11px] text-destructive">Select at least one</p>
            )}

            <div className="mt-3 flex flex-col gap-2">
              {addon.items.map((item) => {
                const isSelected = current.some((i) => i.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(addon, item)}
                    disabled={!isSelected && isMaxed}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all",
                      isSelected
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/50 bg-background hover:border-primary/30",
                      !isSelected && isMaxed && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-md border transition-colors",
                          isSelected ? "border-primary bg-primary" : "border-border",
                        )}
                      >
                        {isSelected && <Check className="size-3 text-primary-foreground" />}
                      </span>
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">+৳{item.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
