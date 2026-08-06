"use client";

import { useRequireAuth } from "@/hooks/use-auth";
import { AccountPageHeader } from "@/components/common/account-page-header";
import { PersonalInfoForm } from "@/components/settings/personal-info-form";
import { NotificationPrefsForm } from "@/components/settings/notification-prefs-form";
import { Loader2, UserRound, BellRing } from "lucide-react";
import { SectionReveal } from "@/components/common/section-reveal";

export default function SettingsPage() {
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
          title="Profile Settings"
          description="Manage your personal information and preferences"
        />

        <SectionReveal className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="size-4" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Personal Information</h2>
              <p className="text-xs text-muted-foreground">Your name, contact details and profile picture</p>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] md:p-8">
            <PersonalInfoForm />
          </div>
        </SectionReveal>

        <SectionReveal className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BellRing className="size-4" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Notification Preferences</h2>
              <p className="text-xs text-muted-foreground">Choose how you want to hear from us</p>
            </div>
          </div>
          <NotificationPrefsForm />
        </SectionReveal>
      </div>
    </main>
  );
}
