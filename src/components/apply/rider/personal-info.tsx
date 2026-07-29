import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { User, PhoneCall } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";
interface Props {
  register: UseFormRegister<RiderFormData>;
  errors: FieldErrors<RiderFormData>;
}

export function PersonalInfo({ register, errors }: Props) {
  return (
    <div className="space-y-12">
      {/* Personal Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            01
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <User className="size-5 text-primary" /> Personal Information
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Full Legal Name"
            error={errors.fullName}
            required
            className="sm:col-span-2"
          >
            <input
              {...register("fullName")}
              type="text"
              placeholder="As per NID / Passport"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Mobile Phone" error={errors.phone} required>
            <input
              {...register("phone")}
              type="tel"
              placeholder="017XXXXXXXX"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Email Address" error={errors.email} required>
            <input
              {...register("email")}
              type="email"
              placeholder="rider@gmail.com"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="National ID (NID)" error={errors.nidNumber} required>
            <input
              {...register("nidNumber")}
              type="text"
              placeholder="10-17 Digit NID"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Date of Birth" error={errors.dob} required>
            <input
              {...register("dob")}
              type="date"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            02
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <PhoneCall className="size-5 text-primary" /> Emergency Contact
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Contact Name" error={errors.emergencyName} required>
            <input
              {...register("emergencyName")}
              type="text"
              placeholder="Parent / Spouse / Relative"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Contact Phone" error={errors.emergencyPhone} required>
            <input
              {...register("emergencyPhone")}
              type="tel"
              placeholder="017XXXXXXXX"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Relationship" error={errors.emergencyRelation} required>
            <select
              {...register("emergencyRelation")}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Relation</option>
              <option value="parent">Parent</option>
              <option value="spouse">Spouse</option>
              <option value="sibling">Sibling</option>
              <option value="friend">Friend</option>
            </select>
          </FormField>
        </div>
      </div>
    </div>
  );
}
