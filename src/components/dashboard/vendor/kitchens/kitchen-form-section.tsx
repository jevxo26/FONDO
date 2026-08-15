// src/components/dashboard/vendor/kitchens/kitchen-form-section.tsx
"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles, KitchenFormValues } from "@/lib/schema/kitchen-schema";
import { Building2, ChefHat, Clock, Users } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormSetValue, Control } from "react-hook-form";

interface KitchenFormSectionProps {
  register: UseFormRegister<KitchenFormValues>;
  errors: FieldErrors<KitchenFormValues>;
  setValue: UseFormSetValue<KitchenFormValues>;
  control: Control<KitchenFormValues>;
  branches: { value: string; label: string }[];
}

export function KitchenFormSection({
  register,
  errors,
  setValue,
  control,
  branches,
}: KitchenFormSectionProps) {
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setValue("code", val, { shouldValidate: true });
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Kitchen Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Kitchen Name" error={errors.name} required className="md:col-span-2">
          <input
            {...register("name")}
            placeholder="e.g. Dhanmondi Kitchen"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Kitchen Code" error={errors.code} required>
          <input
            {...register("code")}
            onChange={(e) => {
              register("code").onChange(e);
              handleCodeChange(e);
            }}
            placeholder="e.g. KCH-001"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Branch" error={errors.branch} required>
          <select {...register("branch")} className={inputStyles}>
            <option value="">Select Branch...</option>
            {branches.map((branch) => (
              <option key={branch.value} value={branch.value}>
                {branch.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Head Chef" error={errors.headChef} required>
          <input
            {...register("headChef")}
            placeholder="e.g. Chef John Doe"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Capacity" error={errors.capacity} required>
          <input
            type="number"
            {...register("capacity")}
            placeholder="e.g. 50"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Current Load" error={errors.currentLoad} required>
          <input
            type="number"
            {...register("currentLoad")}
            placeholder="e.g. 30"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Staff Count" error={errors.staffCount} required>
          <input
            type="number"
            {...register("staffCount")}
            placeholder="e.g. 10"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Preparation Time (minutes)" error={errors.preparationTime} required>
          <input
            type="number"
            {...register("preparationTime")}
            placeholder="e.g. 30"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Status" error={errors.status} required>
          <select {...register("status")} className={inputStyles}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </FormField>
      </div>
    </div>
  );
}
