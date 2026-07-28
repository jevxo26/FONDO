// src/app/dashboard/vendor/settings/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Settings, Bell, Shield, Clock } from "lucide-react";
import { ProfileForm } from "@/components/dashboard/vendor/settings/profile-form";
import { SettingsCards } from "@/components/dashboard/vendor/settings/settings-cards";
import { OperatingHoursSection } from "@/components/dashboard/vendor/settings/operating-hours";
import { DocumentsSection } from "@/components/dashboard/vendor/settings/documents-section";
import { DangerZone } from "@/components/dashboard/vendor/settings/danger-zone";
import { Separator } from "@/components/ui/separator";
import { vendorSettings, vendorOperatingHours, vendorDocuments } from "@/data/vendor-settings";

export default function VendorSettingsPage() {
  const isProfileComplete = true; // Based on document verification status
  const notificationsEnabled = vendorSettings.notificationEnabled && vendorSettings.emailEnabled;
  const openHours = vendorOperatingHours.filter((d) => !d.isClosed);
  const hoursString = openHours.length > 0 
    ? `${openHours[0].opening} - ${openHours[openHours.length - 1].closing}` 
    : "Closed";

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
          value={hoursString}
          variant="default"
          icon={Clock}
          accent="right"
        />
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
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

        {/* Documents Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight">Documents</h3>
            <p className="text-sm text-muted-foreground">Upload and manage business verification documents</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
            <DocumentsSection />
          </div>
        </section>

        <Separator className="border-primary/10" />

        {/* Operating Hours Section */}
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

        {/* Preferences Section */}
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

        {/* Danger Zone */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-fraunces text-xl font-semibold tracking-tight text-destructive">Account</h3>
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