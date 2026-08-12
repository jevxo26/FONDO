"use client";

import { useRequireAuth } from "@/hooks/use-auth";
import { AccountPageHeader } from "@/components/common/account-page-header";
import { ChangePasswordForm } from "@/components/security/change-password-form";
import { DeviceRegistry } from "@/components/security/device-registry";
import { LoginHistoryTable } from "@/components/security/login-history-table";
import { Loader2, Lock, Laptop, History } from "lucide-react";
import { SectionReveal } from "@/components/common/section-reveal";

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-foreground">
        <Icon className="size-4" />
      </div>
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  const { loading } = useRequireAuth();

  if (loading) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-8 lg:py-12">
      <div className="wrapper max-w-5xl space-y-12">
        <AccountPageHeader
          title="Security"
          description="Password, active devices and sign-in activity"
        />

        <SectionReveal className="space-y-4">
          <SectionHeading
            icon={Lock}
            title="Change Password"
            description="Keep your account safe with a strong password"
          />
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] md:p-8">
            <ChangePasswordForm />
          </div>
        </SectionReveal>

        <SectionReveal className="space-y-4">
          <SectionHeading
            icon={Laptop}
            title="Active Devices"
            description="Review active sessions and revoke access if suspicious"
          />
          <DeviceRegistry />
        </SectionReveal>

        <SectionReveal className="space-y-4">
          <SectionHeading
            icon={History}
            title="Login History"
            description="Recent sign-ins to your account"
          />
          <LoginHistoryTable />
        </SectionReveal>
      </div>
    </main>
  );
}
