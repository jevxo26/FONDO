import { PageHeader } from "@/components/dashboard/common/page-header";
import { PackageCard } from "@/components/dashboard/foods/packages/package-card";
import { Button } from "@/components/ui/button";
import { foodPackages } from "@/data/packages";
import { Package, Plus, Download } from "lucide-react";

export default function FoodPackagesPage() {
  return (
    <div>
      <PageHeader
        title="Packages"
        description="Manage dietary meal packages for subscription plans."
        icon={Package}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" />
              Add Package
            </Button>
          </div>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {foodPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
