"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiderFormData, riderFormSchema } from "@/lib/schema/rider-schema";
import { PersonalInfo } from "@/components/apply/rider/personal-info";
import { ZoneVehicleInfo } from "@/components/apply/rider/zone-vehicle-info";
import { RiderTermsSubmit } from "@/components/apply/rider/rider-term";
import { DocumentUploadInfo } from "@/components/apply/rider/document-upload";
import { PayoutInfo } from "@/components/apply/rider/payout-info";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import Swal from "sweetalert2";
import { useCreateRiderMutation } from "@/store/api/slices/rider-api";

export function RiderRegistrationForm() {
  const [applyRider, { isLoading: isApiSubmitting }] = useCreateRiderMutation();
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
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
      division: "",
      district: "",
      upazilaOrThana: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
      workZoneDivision: "",
      workZoneDistrict: "",
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

  const selectedVehicle = watch("vehicleType");

  const mapVehicleType = (type: string): string => {
    const normalized = type.toLowerCase();
    if (normalized === "motorbike" || normalized === "bike") return "BIKE";
    return normalized.toUpperCase(); // BICYCLE, SCOOTER, CAR, VAN
  };

  const mapPayoutMethod = (method: string): string => {
    return method.toUpperCase(); // BKASH, NAGAD, ROCKET, BANK
  };

  const isFileInstance = (value: unknown): value is File => value instanceof File;

  const onSubmit = async (data: RiderFormData) => {
    try {
      setUploadStatus("Uploading documents...");

      // 1. Upload NID Documents
      const nidFrontUrl = isFileInstance(data.nidFront)
        ? await uploadToCloudinary(data.nidFront)
        : "";
      const nidBackUrl = isFileInstance(data.nidBack)
        ? await uploadToCloudinary(data.nidBack)
        : "";

      // 2. Upload Driving License Documents
      let licenseFrontUrl = "";
      let licenseBackUrl = "";

      if (isFileInstance(data.licenseFront)) {
        licenseFrontUrl = await uploadToCloudinary(data.licenseFront);
      }
      if (isFileInstance(data.licenseBack)) {
        licenseBackUrl = await uploadToCloudinary(data.licenseBack);
      }

      setUploadStatus("Submitting application...");

      // 3. Prepare Payload
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        nidNumber: data.nidNumber,
        dob: data.dob,
        avatar: nidFrontUrl || undefined,

        division: data.division,
        district: data.district,
        upazilaOrThana: data.upazilaOrThana,

        emergencyName: data.emergencyName,
        emergencyPhone: data.emergencyPhone,
        emergencyRelation: data.emergencyRelation,

        workZoneDivision: data.workZoneDivision,
        workZoneDistrict: data.workZoneDistrict,
        workZone: data.workZone,

        vehicleType: mapVehicleType(data.vehicleType),
        payoutMethod: mapPayoutMethod(data.payoutMethod),

        drivingLicenseNo: data.drivingLicenseNo || null,
        vehicleRegNumber: data.vehicleRegNumber || null,

        mobileWalletNumber: data.mobileWalletNumber,
        bankName: data.bankName || null,
        bankAccountNumber: data.bankAccountNumber || null,

        termsAccepted: Boolean(data.termsAccepted),
        safetyCodeAccepted: Boolean(data.safetyCodeAccepted),
        backgroundCheckAccepted: Boolean(data.backgroundCheckAccepted),

        documents: [
          { type: "NID_FRONT", url: nidFrontUrl },
          { type: "NID_BACK", url: nidBackUrl },
          ...(licenseFrontUrl ? [{ type: "LICENSE_FRONT", url: licenseFrontUrl }] : []),
          ...(licenseBackUrl ? [{ type: "LICENSE_BACK", url: licenseBackUrl }] : []),
        ],
      };

      // 4. Submit Payload
      await applyRider(payload).unwrap();

      // 5. Fire Success Swal Alert
      await Swal.fire({
        title: "Application Submitted!",
        text: "Your rider application has been received successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10B981", // Emerald Green
      });

      // 6. Reset the Form
      reset();

    } catch (err: any) {
      Swal.fire({
        title: "Submission Failed",
        text: err?.data?.message || err?.message || "Something went wrong while submitting.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setUploadStatus("");
    }
  };
  const isSubmitting = isApiSubmitting || Boolean(uploadStatus);

  return (
    <section id="rider-apply" className="py-(--space-section) bg-background border-b border-border">
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
            <PersonalInfo register={register} errors={errors} setValue={setValue} watch={watch} />
            <ZoneVehicleInfo register={register} errors={errors} selectedVehicle={selectedVehicle} setValue={setValue} watch={watch} />
            <PayoutInfo register={register} errors={errors} />
            <DocumentUploadInfo register={register} errors={errors} setValue={setValue} watch={watch} />

            {uploadStatus && (
              <p className="text-xs text-center font-medium text-primary animate-pulse">
                {uploadStatus}
              </p>
            )}

            <RiderTermsSubmit register={register} errors={errors} isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </section>
  );
}