"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CoreLayoutWrapper } from "@/components/auth/core-layout-wrapper";
import { LoginForm } from "@/components/auth/login/login-form";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

import { ROLE_DASHBOARD } from "@/data/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isAuthenticated, loading, error } = useAuth();

  const methods = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
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
      const route = ROLE_DASHBOARD[user.role] || "/";
      router.push(route);
    }
  }, [isAuthenticated, user, router]);

  const quickLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast.success(`Logged in as ${email}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
    }
  };

  const devUsers = [
    { label: "Admin", email: "admin@fondo.com", role: "ADMIN" },
    { label: "Vendor", email: "vendor@fondo.com", role: "VENDOR" },
    { label: "Kitchen", email: "kitchen@fondo.com", role: "KITCHEN_STAFF" },
    { label: "Rider", email: "rider@fondo.com", role: "RIDER" },
    { label: "Customer", email: "customer@fondo.com", role: "CUSTOMER" },
  ];

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

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl">
        <span className="text-xs text-gray-400 flex items-center mr-1 whitespace-nowrap">
          Quick Login:
        </span>
        {devUsers.map((u) => (
          <button
            key={u.role}
            type="button"
            disabled={loading}
            onClick={() => quickLogin(u.email, "password123")}
            className="px-3 py-1.5 rounded text-xs font-medium text-white transition-colors bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
          >
            {u.label}
          </button>
        ))}
      </div>
    </div>
  );
}
