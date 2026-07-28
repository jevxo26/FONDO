// src/components/dashboard/vendor/settings/operating-hours.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { vendorOperatingHours } from "@/data/vendor-settings";

export function OperatingHoursSection() {
  const [hours, setHours] = useState(vendorOperatingHours);

  const toggleDay = (index: number) => {
    setHours((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isClosed: !item.isClosed } : item
      )
    );
  };

  const updateTime = (index: number, field: "opening" | "closing", value: string) => {
    setHours((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="font-semibold text-sm">Operating Hours</h4>
        <p className="text-xs text-muted-foreground">Set your weekly operating hours</p>
      </div>

      <div className="space-y-2">
        {hours.map((day, index) => (
          <Card key={day.day} className={`p-3 ${day.isClosed ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-4">
              <div className="w-24">
                <Label className="text-sm font-medium">{day.day}</Label>
              </div>
              <div className="flex-1 flex items-center gap-3">
                {!day.isClosed ? (
                  <>
                    <Input
                      type="time"
                      value={day.opening}
                      onChange={(e) => updateTime(index, "opening", e.target.value)}
                      className="w-28 h-8"
                    />
                    <span className="text-xs text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={day.closing}
                      onChange={(e) => updateTime(index, "closing", e.target.value)}
                      className="w-28 h-8"
                    />
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Closed</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={!day.isClosed}
                  onCheckedChange={() => toggleDay(index)}
                />
                <Label className="text-xs cursor-pointer">
                  {day.isClosed ? "Closed" : "Open"}
                </Label>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}