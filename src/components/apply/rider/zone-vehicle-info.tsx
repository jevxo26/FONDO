import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MapPin } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";
import { WORK_ZONES } from "./riderdata";

interface Props {
  register: UseFormRegister<RiderFormData>;
  errors: FieldErrors<RiderFormData>;
  selectedVehicle: string;
}

export function ZoneVehicleInfo({ register, errors, selectedVehicle }: Props) {
  const isMotorized = selectedVehicle === "motorbike" || selectedVehicle === "scooter";

  return (
    <div className="space-y-12">
      {/* Preferred Zone & Vehicle */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            03
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="size-5 text-primary" /> Work Zone & Vehicle
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Preferred Work Zone" error={errors.workZone} required>
            <select
              {...register("workZone")}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Delivery Zone</option>
              {WORK_ZONES.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </FormField>

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
                  placeholder="Dhaka Metro-HA-XX-XXXX"
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
