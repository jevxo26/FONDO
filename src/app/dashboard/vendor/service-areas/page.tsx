// src/app/dashboard/vendor/service-areas/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorServiceAreaTableSection } from "@/components/dashboard/vendor/service-areas/service-area-table-section";
import { MapPin, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { vendorServiceAreas } from "@/data/vendor-service-areas";

export default function VendorServiceAreasPage() {
  const totalAreas = vendorServiceAreas.length;
  const activeAreas = vendorServiceAreas.filter((a) => a.isActive).length;
  const inactiveAreas = vendorServiceAreas.filter((a) => !a.isActive).length;
  const avgDeliveryCharge = Math.round(
    vendorServiceAreas.reduce((acc, a) => acc + a.deliveryCharge, 0) / totalAreas
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Service Areas"
        description="Manage your delivery service areas and charges."
        icon={MapPin}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Areas"
          value={totalAreas.toString()}
          icon={MapPin}
          accent="right"
        />
        <StatCard
          label="Active"
          value={activeAreas.toString()}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Inactive"
          value={inactiveAreas.toString()}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
        <StatCard
          label="Avg Delivery Charge"
          value={`৳${avgDeliveryCharge}`}
          variant="default"
          icon={DollarSign}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Service Area List
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {activeAreas} Active · {totalAreas} Total
          </p>
        </div>
        <VendorServiceAreaTableSection />
      </div>
    </div>
  );
}