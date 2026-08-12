"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorKitchenTableSection } from "@/components/dashboard/vendor/kitchens/kitchen-table-section";
import { Building2, ChefHat, Clock, AlertCircle, Loader2 } from "lucide-react";
import { vendorKitchens } from "@/data/vendor-kitchens";

export default function VendorKitchensPage() {
  // No GET endpoint exists - using mock data with "Coming Soon" banner
  const isLoading = false;
  const kitchens = vendorKitchens;

  const activeKitchens = kitchens.filter((k) => k.status === "ACTIVE").length;
  const totalStaff = kitchens.reduce((acc, k) => acc + k.staffCount, 0);
  const avgPrepTime = Math.round(
    kitchens.reduce((acc, k) => acc + k.preparationTime, 0) / kitchens.length,
  );
  const totalCapacity = kitchens.reduce((acc, k) => acc + k.capacity, 0);
  const totalLoad = kitchens.reduce((acc, k) => acc + k.currentLoad, 0);
  const capacityPercentage = Math.round((totalLoad / totalCapacity) * 100);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Kitchens"
          description="Manage your kitchen operations."
          icon={Building2}
        />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Kitchens"
        description="Manage your kitchen operations and assignments."
        icon={Building2}
      />

      <div className="rounded-3xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-4 text-center">
        <p className="text-sm text-amber-700 dark:text-amber-400">
          ⚠️ Kitchen management API is coming soon. You can view your kitchens but creation is not
          yet available.
        </p>
      </div>

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
          variant={
            capacityPercentage > 80 ? "danger" : capacityPercentage > 60 ? "warning" : "success"
          }
          icon={AlertCircle}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">Kitchen List</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {activeKitchens} Active · {kitchens.length} Total
          </p>
        </div>
        <VendorKitchenTableSection data={kitchens} isLoading={isLoading} />
      </div>
    </div>
  );
}
