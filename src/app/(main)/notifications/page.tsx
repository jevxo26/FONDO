"use client";

import { useRequireAuth } from "@/hooks/use-auth";
import { AccountPageHeader } from "@/components/common/account-page-header";
import { NotificationPrefsForm } from "@/components/settings/notification-prefs-form";
import { Loader2, BellRing, Inbox } from "lucide-react";
import { SectionReveal } from "@/components/common/section-reveal";

export default function NotificationsPage() {
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
          title="Notifications"
          description="Your notification inbox and preferences"
        />

        <SectionReveal className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background shadow-[var(--shadow-elevated)]">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute right-5 top-5 size-[7px] rotate-45 border border-primary/40" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Inbox className="size-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
                Notification Inbox
              </h2>
              <p className="mt-1 max-w-xl text-small text-background/70">
                Order updates, promotions and account alerts will live here. We&apos;re wiring this
                up — until then, keep an eye on your email.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-foreground">
              <BellRing className="size-4" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Preferences</h2>
              <p className="text-xs text-muted-foreground">Choose how you want to hear from us</p>
            </div>
          </div>
          <NotificationPrefsForm />
        </SectionReveal>
      </div>
    </main>
  );
}
