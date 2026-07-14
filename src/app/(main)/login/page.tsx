"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { CoreLayoutWrapper } from "@/components/auth/core-layout-wrapper";
import { LoginForm } from "@/components/auth/login/login-form";
import { useAuth } from "@/hooks/useAuth";

const ROLE_ROUTES: Record<string, string> = {
  CUSTOMER: "/",
  ADMIN: "/dashboard/admin",
  SUPER_ADMIN: "/dashboard/admin",
  VENDOR: "/dashboard/vendor",
  VENDOR_STAFF: "/dashboard/vendor",
  KITCHEN_STAFF: "/dashboard/kitchen",
  RIDER: "/dashboard/rider",
  SUPPORT_AGENT: "/dashboard/admin",
};

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isAuthenticated, loading, error } = useAuth();

  const methods = useForm({
    defaultValues: { identity: "", password: "" },
  });

  const onLoginSubmit = async (data: { identity: string; password: string }) => {
    try {
      await login(data.identity, data.password);
      toast.success("Login successful");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid email/phone or password";
      toast.error(message);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const route = ROLE_ROUTES[user.role] || "/";
      router.push(route);
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center py-10 px-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onLoginSubmit)}
          className="w-full max-w-6xl"
        >
          <CoreLayoutWrapper currentStep={3}>
            <LoginForm onSubmit={onLoginSubmit} loading={loading} />
          </CoreLayoutWrapper>
        </form>
      </FormProvider>
    </div>
  );
}
