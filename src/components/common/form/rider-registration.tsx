"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiderFormData, riderFormSchema } from "@/lib/schema/rider-schema";
import { PersonalInfo } from "@/components/apply/rider/personal-info";
import { ZoneVehicleInfo } from "@/components/apply/rider/zone-vehicle-info";
import { PayoutDocInfo } from "@/components/apply/rider/payout-info";
import { RiderTermsSubmit } from "@/components/apply/rider/rider-term";

export function RiderRegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RiderFormData>({
    resolver: yupResolver(riderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      nidNumber: "",
      dob: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
      workZone: "",
      vehicleType: "motorbike",
      drivingLicenseNo: "",
      vehicleRegNumber: "",
      payoutMethod: "bkash",
      mobileWalletNumber: "",
      bankName: "",
      bankAccountNumber: "",
      termsAccepted: false,
      safetyCodeAccepted: false,
      backgroundCheckAccepted: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedVehicle = watch("vehicleType");

  const onSubmit = (data: RiderFormData) => {
    console.log("Rider Application Submitted:", data);
    alert("Rider Application submitted successfully! Our team will contact you within 24 hours.");
  };

  return (
    <section
      id="rider-apply"
      className="py-(--space-section) bg-background border-b border-border"
    >
      <div className="wrapper px-(--space-container)">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Join the Fleet
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
              Rider Registration Form
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              Complete your details to start delivering healthy meals in your preferred zone.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-4xl p-6 sm:p-10 shadow-[var(--shadow-elevated)] space-y-12"
          >
            <PersonalInfo register={register} errors={errors} />
            <ZoneVehicleInfo
              register={register}
              errors={errors}
              selectedVehicle={selectedVehicle}
            />
            <PayoutDocInfo register={register} errors={errors} />
            <RiderTermsSubmit register={register} errors={errors} isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </section>
  );
}