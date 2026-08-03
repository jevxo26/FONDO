"use client";

import { FormField } from "@/components/common/form-field";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import type { AdminVendorOption } from "@/types/admin-food";
import { Loader2, Store } from "lucide-react";
import { Controller, type Control } from "react-hook-form";

interface VendorAssignmentProps {
  control: Control<AdminFoodFormValues>;
  vendors?: AdminVendorOption[];
  loading?: boolean;
}

export function VendorAssignment({ control, vendors, loading }: VendorAssignmentProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Store className="size-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Vendor Assignment</h2>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Link this food to one or more approved vendors. Customers never see the vendor — the
        system assigns fulfillment based on priority.
      </p>

      <Controller
        control={control}
        name="vendorIds"
        render={({ field }) => (
          <FormField label="Vendors" className="mt-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Loading vendors...
              </div>
            ) : vendors && vendors.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {vendors.map((vendor) => {
                  const checked = field.value?.includes(vendor.id) ?? false;
                  return (
                    <label
                      key={vendor.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                        checked
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="size-4 accent-primary"
                        checked={checked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...(field.value ?? []), vendor.id]
                            : (field.value ?? []).filter((id) => id !== vendor.id);
                          field.onChange(next);
                        }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {vendor.businessName}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No approved vendors found. Approve vendors first, then link them to this food.
              </p>
            )}
          </FormField>
        )}
      />
    </div>
  );
}
