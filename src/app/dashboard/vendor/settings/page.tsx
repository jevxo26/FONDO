"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Settings, Bell, Shield, Clock, Loader2 } from "lucide-react";
import { ProfileForm } from "@/components/dashboard/vendor/settings/profile-form";
import { SettingsCards } from "@/components/dashboard/vendor/settings/settings-cards";
import { OperatingHoursSection } from "@/components/dashboard/vendor/settings/operating-hours";
import { DocumentsSection } from "@/components/dashboard/vendor/settings/documents-section";
import { DangerZone } from "@/components/dashboard/vendor/settings/danger-zone";
import { Separator } from "@/components/ui/separator";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import { useGetVendorSettingsQuery } from "@/store/api/slices/vendor-api";

export default function VendorSettingsPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const vendorCode = vendor?.vendorCode;

  const { data: settings, isLoading: settingsLoading } = useGetVendorSettingsQuery(
    vendorCode || "",
    {
      skip: !vendorCode,
    },
  );

  const isLoading = vendorLoading || settingsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Settings"
          description="Manage your business profile and preferences."
          icon={Settings}
        />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const isProfileComplete = true;
  const notificationsEnabled = settings?.notificationEnabled ?? false;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your business profile and preferences."
        icon={Settings}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Business Profile"
          value={isProfileComplete ? "Complete" : "Incomplete"}
          variant={isProfileComplete ? "success" : "warning"}
          icon={Shield}
          accent="right"
        />
        <StatCard
          label="Notifications"
          value={notificationsEnabled ? "Enabled" : "Disabled"}
          variant={notificationsEnabled ? "success" : "warning"}
          icon={Bell}
          accent="right"
        />
        <StatCard
          label="Operating Hours"
          value="Set your hours"
          variant="default"
          icon={Clock}
          accent="right"
        />
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight">Profile</h3>
            <p className="text-sm text-muted-foreground">Manage your business information</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
            <ProfileForm />
          </div>
        </section>

        <Separator className="border-primary/10" />

        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight">Documents</h3>
            <p className="text-sm text-muted-foreground">
              Upload and manage business verification documents
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
            <DocumentsSection />
          </div>
        </section>

        <Separator className="border-primary/10" />

        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight">Operating Hours</h3>
            <p className="text-sm text-muted-foreground">Set your weekly business hours</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
            <OperatingHoursSection />
          </div>
        </section>

        <Separator className="border-primary/10" />

        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight">Preferences</h3>
            <p className="text-sm text-muted-foreground">Configure your business preferences</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
            <SettingsCards />
          </div>
        </section>

        <Separator className="border-primary/10" />

        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight text-destructive">
              Account
            </h3>
            <p className="text-sm text-muted-foreground">Manage your account settings</p>
          </div>
          <div className="rounded-3xl p-6">
            <DangerZone />
          </div>
        </section>
      </div>
    </div>
  );
}
