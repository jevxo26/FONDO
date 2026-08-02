// src/app/dashboard/admin/foods/packages/page.tsx
'use client'
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PackageCard } from "@/components/dashboard/admin/foods/packages/package-card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Download } from "lucide-react";
import Link from "next/link";
import { useGetPackages } from "@/store/api/slices/packages-api";
import FoodsLoading from "@/app/(main)/foods/loading";

export default function FoodPackagesPage() {
  const { data:allPackage, isLoading: packageLoading } = useGetPackages();
  if(packageLoading)  return <FoodsLoading/>
  console.log(allPackage)
  return (
    <div>
      <PageHeader
        title="Packages"
        description="Manage dietary meal packages for subscription plans."
        icon={Package}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full">
              <Download className="size-4.5" />
              Export
            </Button>
            <Link href="/dashboard/admin/foods/packages/add">
              <Button className="rounded-full">
                <Plus className="size-4.5" />
                Add Package
              </Button>
            </Link>
          </div>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {allPackage.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
