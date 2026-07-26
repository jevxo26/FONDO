import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MapPin, GitBranch } from "lucide-react";
import { VendorFormData } from "@/lib/schema/vendor-schema";
import { FormField } from "@/components/common/form-field";

interface Props {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
}

export function AddressBranchInfo({ register, errors }: Props) {
  return (
    <div className="space-y-12">
      {/* Address */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">03</span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="size-5 text-primary" /> Business Address</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Street Address" error={errors.streetAddress} required className="sm:col-span-2">
            <input {...register("streetAddress")} type="text" placeholder="House, Road, Block, Area" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="City" error={errors.city} required>
            <input {...register("city")} type="text" placeholder="e.g. Dhaka" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Postal Code" error={errors.postalCode} required>
            <input {...register("postalCode")} type="text" placeholder="1212" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Delivery Radius" error={errors.deliveryRadius} required className="sm:col-span-2">
            <select {...register("deliveryRadius")} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="3km">3 km radius</option>
              <option value="5km">5 km radius</option>
              <option value="10km">10 km radius</option>
              <option value="citywide">Citywide</option>
            </select>
          </FormField>
        </div>
      </div>

      {/* Branch Info */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">04</span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2"><GitBranch className="size-5 text-primary" /> Branch Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Number of Outlets" error={errors.branchCount} required>
            <input {...register("branchCount")} type="number" min={1} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Main Branch Name" error={errors.branchName} required>
            <input {...register("branchName")} type="text" placeholder="e.g. Gulshan Outlet" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Kitchen Setup Type" error={errors.kitchenType} required>
            <select {...register("kitchenType")} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="Commercial Kitchen">Commercial Kitchen</option>
              <option value="Home Kitchen">Home Kitchen</option>
              <option value="Shared Facility">Shared Facility</option>
            </select>
          </FormField>
        </div>
      </div>
    </div>
  );
}