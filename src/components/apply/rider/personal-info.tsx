"use client";

import React, { useMemo } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { User, PhoneCall, MapPin } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";
import {
  getAllDivisions,
  getDistrictsByDivision,
  getSubLocationsByDistrict,
} from "@/data/bangladesh-data";

interface Props {
  register: UseFormRegister<RiderFormData>;
  errors: FieldErrors<RiderFormData>;
  setValue: UseFormSetValue<RiderFormData>;
  watch: UseFormWatch<RiderFormData>;
}

export function PersonalInfo({ register, errors, setValue, watch }: Props) {
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  // All Static Divisions
  const divisions = getAllDivisions();

  // 1. Derived State: Calculate available districts on the fly (No useEffect/useState)
  const availableDistricts = useMemo(() => {
    return selectedDivision ? getDistrictsByDivision(selectedDivision) : [];
  }, [selectedDivision]);

  // 2. Derived State: Calculate available sub-locations on the fly (No useEffect/useState)
  const availableSubLocations = useMemo(() => {
    return selectedDistrict
      ? getSubLocationsByDistrict(selectedDistrict)
      : { upazilas: [], thanas: [] };
  }, [selectedDistrict]);

  // Extract register properties for custom onChange handlers
  const divisionRegister = register("division");
  const districtRegister = register("district");
  const upazilaRegister = register("upazilaOrThana");

  return (
    <div className="space-y-12">
      {/* Personal Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            01
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <User className="size-5 text-foreground" /> Personal Information
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="First Name" error={errors.firstName} required>
            <input
              {...register("firstName")}
              type="text"
              placeholder="e.g. Tanvir"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Last Name" error={errors.lastName} required>
            <input
              {...register("lastName")}
              type="text"
              placeholder="e.g. Rahman"
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
          <FormField label="Password" error={errors.password} required className="sm:col-span-2">
            <input
              {...register("password")}
              type="password"
              placeholder="Minimum 8 characters"
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

      {/* Present Address */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            02
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="size-5 text-foreground" /> Present Address
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Division */}
          <FormField label="Division" error={errors.division} required>
            <select
              {...divisionRegister}
              onChange={(e) => {
                divisionRegister.onChange(e);
                setValue("district", "", { shouldValidate: true });
                setValue("upazilaOrThana", "", { shouldValidate: true });
              }}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Division</option>
              {divisions.map((div: string) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </FormField>

          {/* District */}
          <FormField label="District" error={errors.district} required>
            <select
              {...districtRegister}
              disabled={!selectedDivision}
              onChange={(e) => {
                districtRegister.onChange(e);
                setValue("upazilaOrThana", "", { shouldValidate: true });
              }}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">Select District</option>
              {availableDistricts.map((dist: string) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </FormField>

          {/* Upazila / Thana */}
          <FormField label="Upazila / Thana" error={errors.upazilaOrThana} required>
            <select
              {...upazilaRegister}
              disabled={!selectedDistrict}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">Select Upazila or Thana</option>
              {availableSubLocations.thanas.length > 0 && (
                <optgroup label="Metropolitan Thanas">
                  {availableSubLocations.thanas.map((thana: string) => (
                    <option key={thana} value={thana}>
                      {thana} (Thana)
                    </option>
                  ))}
                </optgroup>
              )}
              {availableSubLocations.upazilas.length > 0 && (
                <optgroup label="Upazilas">
                  {availableSubLocations.upazilas.map((upazila: string) => (
                    <option key={upazila} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </FormField>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            03
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <PhoneCall className="size-5 text-foreground" /> Emergency Contact
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