// src/app/dashboard/admin/foods/packages/page.tsx
'use client'
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PackageCard, type FoodPackage } from "@/components/dashboard/admin/foods/packages/package-card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Download, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useListAdminPackagesQuery } from "@/store/api/slices/packages-api";
import FoodsLoading from "@/app/(main)/foods/loading";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
] as const;

export default function FoodPackagesPage() {
  const [status, setStatus] = useState<string>("");
const params = {limit: 100, ...(status ? { status } : {}),};

const { data: result, isLoading } = useListAdminPackagesQuery(params);
  if (isLoading) return <FoodsLoading />;

  const allPackages = result?.items ?? [];
  return (
    <div>
      <PageHeader
        title="Packages"
        description="Manage dietary meal packages for subscription plans."
        icon={Package}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/dashboard/admin/foods/packages/approval">
              <Button variant="outline" className="rounded-full">
                <ClipboardCheck className="size-4.5" />
                Approval Queue
              </Button>
            </Link>
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

      <div className="mt-6 flex items-center gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition",
              status === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {allPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg as unknown as FoodPackage} />
        ))}
        {allPackages.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-16">
            No packages found.
          </p>
        )}
      </div>
    </div>
  );
}
