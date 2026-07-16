"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CoreLayoutWrapper } from "@/components/auth/core-layout-wrapper";
import { RegistrationForm } from "@/components/auth/register/registration-form";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, loading } = useAuth();

  const onRegisterSubmit = async (data: Record<string, unknown>) => {
    try {
      const { confirmPassword: _, ...payload } = data as {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
      };
      await registerUser(payload);
      toast.success("Registration successful! Please sign in.");
      router.push("/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center py-10 px-4">
      <CoreLayoutWrapper currentStep={1}>
        <RegistrationForm onSubmit={onRegisterSubmit} loading={loading} />
      </CoreLayoutWrapper>
    </div>
  );
}
