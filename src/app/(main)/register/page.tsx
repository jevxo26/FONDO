"use client";

import { CoreLayoutWrapper } from "@/components/auth/core-layout-wrapper";
import { RegistrationForm } from "@/components/auth/register/registratiom-form";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function RegisterPage() {
  // Initialize unified single-step form state management scope
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      contactInfo: "",
      password: "",
      confirmPassword: ""
    }
  });

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center py-10 px-4">
      <FormProvider {...methods}>
        <CoreLayoutWrapper currentStep={1}>
          <RegistrationForm />
        </CoreLayoutWrapper>
      </FormProvider>
    </div>
  );
}