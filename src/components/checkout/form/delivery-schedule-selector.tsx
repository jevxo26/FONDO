"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DeliverySchedule } from "@/types/checkout-type";

const SLOTS = ["Morning", "Afternoon", "Evening"] as const;

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
    <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm flex flex-col gap-4">
      <h2 className="font-sans text-base font-semibold text-foreground">Delivery Schedule</h2>

      <div className="flex flex-col gap-2">
        <Label>Delivery Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={cn(
              "inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-8 text-sm font-medium w-full justify-start text-left",
              !value?.deliveryDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="size-4 mr-2 shrink-0" />
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
        <Label>Time Slot</Label>
        <div className="grid grid-cols-3 gap-2">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() =>
                onChange({
                  deliveryDate: value?.deliveryDate ?? tomorrow,
                  deliverySlot: slot,
                })
              }
              className={cn(
                "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                value?.deliverySlot === slot
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground",
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
