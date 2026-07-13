"use client";

import { CoreLayoutWrapper } from "@/components/auth/core-layout-wrapper";
import { LoginForm } from "@/components/auth/login/login-form";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function LoginPage() {
  const methods = useForm({
    defaultValues: {
      identity: "",
      password: ""
    }
  });

  const onLoginSubmit = (data: any) => {
    console.log("Login Authentication Requested Data Package:", data);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center py-10 px-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onLoginSubmit)}
          className="w-full max-w-6xl"
        >
          <CoreLayoutWrapper currentStep={3}>
            <LoginForm />
          </CoreLayoutWrapper>
        </form>
      </FormProvider>
    </div>
  );
}