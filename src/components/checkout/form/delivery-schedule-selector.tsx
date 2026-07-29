"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Sun, Clock, Sunset, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { DeliverySchedule } from "@/types/checkout-type";

const SLOTS = [
  { id: "Morning", icon: Sun },
  { id: "Afternoon", icon: Clock },
  { id: "Evening", icon: Sunset },
] as const;

interface Props {
  value?: DeliverySchedule;
  onChange: (schedule: DeliverySchedule) => void;
}

export function DeliveryScheduleSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-4 text-primary" />
        <h2 className="font-sans text-sm font-semibold text-foreground">Delivery Schedule</h2>
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-3.5 text-muted-foreground/60 ml-auto cursor-help" />
          </TooltipTrigger>
          <TooltipContent>Pick your preferred delivery date and time</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Delivery Date
        </span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={cn(
              "inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 h-9 text-sm font-medium w-full justify-start text-left transition-all hover:border-ring focus:border-ring focus:ring-1 focus:ring-ring/50",
              !value?.deliveryDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="size-4 mr-2 shrink-0 text-muted-foreground/60" />
            {value?.deliveryDate ? format(value.deliveryDate, "PPP") : "Select a date"}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value?.deliveryDate}
              onSelect={(date) => {
                if (date) {
                  onChange({
                    deliveryDate: date,
                    deliverySlot: value?.deliverySlot ?? "",
                  });
                  setOpen(false);
                }
              }}
              disabled={{ before: tomorrow }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Time Slot
        </span>
        <div className="grid grid-cols-3 gap-2">
          {SLOTS.map(({ id, icon: SlotIcon }) => {
            const isSelected = value?.deliverySlot === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  onChange({
                    deliveryDate: value?.deliveryDate ?? tomorrow,
                    deliverySlot: id,
                  })
                }
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:shadow-sm",
                )}
              >
                <SlotIcon className={cn("size-4", isSelected && "text-primary")} />
                {id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
