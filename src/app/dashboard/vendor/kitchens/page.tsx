// src/app/dashboard/vendor/kitchens/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorKitchenTableSection } from "@/components/dashboard/vendor/kitchens/kitchen-table-section";
import { Building2, ChefHat, Clock, AlertCircle } from "lucide-react";
import { vendorKitchens } from "@/data/vendor-kitchens";

export default function VendorKitchensPage() {
  const activeKitchens = vendorKitchens.filter((k) => k.status === "ACTIVE").length;
  const totalStaff = vendorKitchens.reduce((acc, k) => acc + k.staffCount, 0);
  const avgPrepTime = Math.round(
    vendorKitchens.reduce((acc, k) => acc + k.preparationTime, 0) / vendorKitchens.length
  );
  const totalCapacity = vendorKitchens.reduce((acc, k) => acc + k.capacity, 0);
  const totalLoad = vendorKitchens.reduce((acc, k) => acc + k.currentLoad, 0);
  const capacityPercentage = Math.round((totalLoad / totalCapacity) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Kitchens"
        description="Manage your kitchen operations and assignments."
        icon={Building2}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Kitchens"
          value={activeKitchens.toString()}
          icon={Building2}
          accent="right"
        />
        <StatCard
          label="Staff On Duty"
          value={totalStaff.toString()}
          icon={ChefHat}
          accent="right"
        />
        <StatCard
          label="Avg Prep Time"
          value={`${avgPrepTime} min`}
          variant="default"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Capacity Used"
          value={`${capacityPercentage}%`}
          variant={capacityPercentage > 80 ? "danger" : capacityPercentage > 60 ? "warning" : "success"}
          icon={AlertCircle}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Kitchen List
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {activeKitchens} Active · {vendorKitchens.length} Total
          </p>
        </div>
        <VendorKitchenTableSection />
      </div>
    </div>
  );
}