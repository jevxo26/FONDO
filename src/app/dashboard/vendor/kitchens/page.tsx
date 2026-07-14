import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Building2, ChefHat, Clock, AlertCircle } from "lucide-react";

export default function VendorKitchensPage() {
  return (
    <div>
      <PageHeader
        title="Kitchens"
        description="Manage your kitchen operations and assignments."
        icon={Building2}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Kitchens" value="3" icon={Building2} accent="right" />
        <StatCard label="Staff On Duty" value="18" icon={ChefHat} accent="right" />
        <StatCard label="Avg Prep Time" value="24 min" variant="default" icon={Clock} accent="right" />
        <StatCard label="Capacity" value="92%" variant="success" icon={AlertCircle} accent="right" />
      </div>
    </div>
  );
}
