/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RulesOrderLimits } from "./rules-order-limits";
import { RulesToggleSwitches } from "./rules-toggle-switches";
import { RulesDeliverySchedule } from "./rules-delivery-schedule";

interface RulesStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export function RulesStep({ data, onChange }: RulesStepProps) {
  const rules = data.rules || {};

  const updateRules = (field: string, value: any) => {
    onChange("rules", { ...rules, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Rules & Schedule</h3>
      <p className="text-sm text-muted-foreground">Set the rules and schedule for your package</p>

      <RulesOrderLimits rules={rules} onUpdate={updateRules} />
      <RulesToggleSwitches rules={rules} onUpdate={updateRules} />
      <RulesDeliverySchedule rules={rules} onUpdate={updateRules} />
    </div>
  );
}
