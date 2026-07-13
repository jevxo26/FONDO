import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Settings, Bell, Shield, Clock } from "lucide-react";

export default function VendorSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your business profile and preferences."
        icon={Settings}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Business Profile" value="Complete" variant="success" icon={Shield} accent="right" />
        <StatCard label="Notifications" value="Enabled" variant="success" icon={Bell} accent="right" />
        <StatCard label="Operating Hours" value="8 AM - 11 PM" variant="default" icon={Clock} accent="right" />
      </div>
    </div>
  );
}
