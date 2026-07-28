"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VendorFormData, vendorFormSchema } from "@/lib/schema/vendor-schema";
import { BusinessOwnerInfo } from "@/components/apply/vendor/business-owner";
import { AddressBranchInfo } from "@/components/apply/vendor/address";
import { CuisineDocInfo } from "@/components/apply/vendor/cusine-document";
import { BankDeliveryTerms } from "@/components/apply/vendor/bank-delivery";

export function VendorRegistrationForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<VendorFormData>({
    resolver: yupResolver(vendorFormSchema),
    defaultValues: {
      businessName: "", businessType: "restaurant", businessEmail: "", businessPhone: "", website: "", description: "",
      ownerName: "", ownerPhone: "", ownerEmail: "", nid: "", dob: "",
      streetAddress: "", city: "Dhaka", postalCode: "", deliveryRadius: "5km",
      branchCount: 1, branchName: "Main Branch", kitchenType: "Commercial Kitchen",
      cuisines: ["Healthy Meals", "High Protein"],
      tradeLicenseNumber: "", tinNumber: "", vatNumber: "", foodLicenseNumber: "",
      bankName: "", accountName: "", accountNumber: "", routingNumber: "", mobileBankingProvider: "bkash", mobileBankingNumber: "",
      useFondoDelivery: true, selfDelivery: false, pickupAvailable: true, scheduledDelivery: true,
      termsAccepted: false, authenticDocsAccepted: false, policiesAccepted: false,
    },
  });

  const selectedCuisines = watch("cuisines") || [];

  const onSubmit = (data: VendorFormData) => {
    console.log("Submitted Data:", data);
    alert("Application submitted successfully!");
  };

  return (
    <section id="vendor-apply" className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Partner Onboarding</span>
            <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">Vendor Registration Form</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">Fill out required details to join Fondo&apos;s food delivery ecosystem.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-4xl p-6 sm:p-10 shadow-[var(--shadow-elevated)] space-y-12">
            <BusinessOwnerInfo register={register} errors={errors} />
            <AddressBranchInfo register={register} errors={errors} />
            <CuisineDocInfo register={register} errors={errors} selectedCuisines={selectedCuisines} setValue={setValue} />
            <BankDeliveryTerms register={register} errors={errors} isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </section>
  );
}