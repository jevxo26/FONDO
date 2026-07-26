import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Building2, User } from "lucide-react";
import { VendorFormData } from "@/lib/schema/vendor-schema";
import { FormField } from "@/components/common/form-field";

interface Props {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
}

export function BusinessOwnerInfo({ register, errors }: Props) {
  return (
    <div className="space-y-12">
      {/* Business Info */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">01</span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2"><Building2 className="size-5 text-primary" /> Business Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Business Name" error={errors.businessName} required className="sm:col-span-2">
            <input {...register("businessName")} type="text" placeholder="e.g. Green Gourmet Kitchen" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Business Type" error={errors.businessType} required>
            <select {...register("businessType")} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="restaurant">Restaurant</option>
              <option value="cloud_kitchen">Cloud Kitchen</option>
              <option value="home_chef">Home Chef</option>
              <option value="meal_prep">Meal Prep Company</option>
            </select>
          </FormField>
          <FormField label="Business Email" error={errors.businessEmail} required>
            <input {...register("businessEmail")} type="email" placeholder="contact@business.com" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Business Phone" error={errors.businessPhone} required>
            <input {...register("businessPhone")} type="tel" placeholder="017XXXXXXXX" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Website / Social URL" error={errors.website}>
            <input {...register("website")} type="text" placeholder="https://facebook.com/yourkitchen" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Business Description" error={errors.description} required className="sm:col-span-2">
            <textarea {...register("description")} rows={3} placeholder="Describe your kitchen and menu..." className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
        </div>
      </div>

      {/* Owner Info */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">02</span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2"><User className="size-5 text-primary" /> Owner Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Owner Full Name" error={errors.ownerName} required>
            <input {...register("ownerName")} type="text" placeholder="Full Legal Name" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Personal Phone" error={errors.ownerPhone} required>
            <input {...register("ownerPhone")} type="tel" placeholder="017XXXXXXXX" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Personal Email" error={errors.ownerEmail} required>
            <input {...register("ownerEmail")} type="email" placeholder="owner@gmail.com" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="National ID (NID)" error={errors.nid} required>
            <input {...register("nid")} type="text" placeholder="10-17 Digit NID" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
          <FormField label="Date of Birth" error={errors.dob} required className="sm:col-span-2">
            <input {...register("dob")} type="date" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </FormField>
        </div>
      </div>
    </div>
  );
}