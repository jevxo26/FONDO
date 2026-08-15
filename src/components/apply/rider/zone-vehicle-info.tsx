"use client";

import React, { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { MapPin } from "lucide-react";
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
  selectedVehicle: string;
  setValue: UseFormSetValue<RiderFormData>;
  watch: UseFormWatch<RiderFormData>;
}

export function ZoneVehicleInfo({
  register,
  errors,
  selectedVehicle,
  setValue,
  watch,
}: Props) {
  const isMotorized = selectedVehicle === "motorbike" || selectedVehicle === "scooter";

  const workZoneDivision = watch("workZoneDivision" as keyof RiderFormData) as string;
  const workZoneDistrict = watch("workZoneDistrict" as keyof RiderFormData) as string;

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableSubLocations, setAvailableSubLocations] = useState<{
    upazilas: string[];
    thanas: string[];
  }>({ upazilas: [], thanas: [] });

  const divisions = getAllDivisions();

  // Update Work Zone Districts when Work Zone Division changes
  useEffect(() => {
    if (workZoneDivision) {
      const dists = getDistrictsByDivision(workZoneDivision);
      setAvailableDistricts(dists);
    } else {
      setAvailableDistricts([]);
    }
  }, [workZoneDivision]);

  // Update Work Zone Upazilas/Thanas when Work Zone District changes
  useEffect(() => {
    if (workZoneDistrict) {
      const sub = getSubLocationsByDistrict(workZoneDistrict);
      setAvailableSubLocations(sub);
    } else {
      setAvailableSubLocations({ upazilas: [], thanas: [] });
    }
  }, [workZoneDistrict]);

  return (
    <div className="space-y-12">
      {/* Preferred Zone & Vehicle */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            04
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="size-5 text-foreground" /> Work Zone & Vehicle
          </h3>
        </div>

        {/* Dynamic Work Zone Selector (Division -> District -> Upazila/Thana) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Work Zone Division */}
          <FormField
            label="Work Zone Division"
            error={errors["workZoneDivision" as keyof RiderFormData]}
            required
          >
            <select
              {...register("workZoneDivision" as keyof RiderFormData)}
              onChange={(e) => {
                setValue("workZoneDivision" as keyof RiderFormData, e.target.value);
                setValue("workZoneDistrict" as keyof RiderFormData, "");
                setValue("workZone" as keyof RiderFormData, "");
              }}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </FormField>

          {/* Work Zone District */}
          <FormField
            label="Work Zone District"
            error={errors["workZoneDistrict" as keyof RiderFormData]}
            required
          >
            <select
              {...register("workZoneDistrict" as keyof RiderFormData)}
              disabled={!workZoneDivision}
              onChange={(e) => {
                setValue("workZoneDistrict" as keyof RiderFormData, e.target.value);
                setValue("workZone" as keyof RiderFormData, "");
              }}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">Select District</option>
              {availableDistricts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </FormField>

          {/* Work Zone Area / Upazila / Thana */}
          <FormField label="Preferred Work Area" error={errors.workZone} required>
            <select
              {...register("workZone")}
              disabled={!workZoneDistrict}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">Select Area / Thana</option>
              {availableSubLocations.thanas.length > 0 && (
                <optgroup label="Metropolitan Thanas">
                  {availableSubLocations.thanas.map((thana) => (
                    <option key={thana} value={thana}>
                      {thana} (Thana)
                    </option>
                  ))}
                </optgroup>
              )}
              {availableSubLocations.upazilas.length > 0 && (
                <optgroup label="Upazilas">
                  {availableSubLocations.upazilas.map((upazila) => (
                    <option key={upazila} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </FormField>
        </div>

        {/* Vehicle Selection & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <FormField label="Vehicle Type" error={errors.vehicleType} required>
            <select
              {...register("vehicleType")}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="motorbike">Motorbike</option>
              <option value="bicycle">Bicycle</option>
              <option value="scooter">Electric Scooter</option>
              <option value="walker">Walker / Runner</option>
            </select>
          </FormField>

          {isMotorized && (
            <>
              <FormField
                label="Driving License Number"
                error={errors.drivingLicenseNo}
                required={isMotorized}
              >
                <input
                  {...register("drivingLicenseNo")}
                  type="text"
                  placeholder="15-digit License No."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </FormField>
              <FormField
                label="Vehicle Registration No."
                error={errors.vehicleRegNumber}
                required={isMotorized}
              >
                <input
                  {...register("vehicleRegNumber")}
                  type="text"
                  placeholder="Dhaka/Chatto Metro-HA-XX-XXXX"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </FormField>
            </>
          )}
        </div>
      </div>
    </div>
  );
}