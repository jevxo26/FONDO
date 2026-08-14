"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PackageCard } from "@/components/dashboard/vendor/packages/package-card";
import { Button } from "@/components/ui/button";
import { useListVendorPackagesQuery } from "@/store/api/slices/packages-api";
import { AlertCircle, CheckCircle2, Clock, Gift, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VendorPackagesPage() {
  const router = useRouter();
  const { data, isLoading } = useListVendorPackagesQuery();

  const packages = data ?? [];
  const pending = packages.filter((p) => p.status === "PENDING").length;
  const approved = packages.filter((p) => p.status === "APPROVED").length;
  const rejected = packages.filter((p) => p.status === "REJECTED").length;

  const handleView = (id: string) => {
    router.push(`/dashboard/vendor/packages/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/vendor/packages/${id}/edit`);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Packages"
        description="Create meal packages and submit them for admin approval."
        icon={Gift}
        actions={
          <Link href="/dashboard/vendor/packages/add">
            <Button className="rounded-full">
              <Plus className="size-4.5" />
              Create Package
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Packages"
          value={isLoading ? "…" : packages.length.toString()}
          icon={Gift}
          accent="right"
        />
        <StatCard
          label="Pending Approval"
          value={isLoading ? "…" : pending.toString()}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Approved"
          value={isLoading ? "…" : approved.toString()}
          variant="success"
          icon={CheckCircle2}
          accent="right"
        />
        <StatCard
          label="Rejected"
          value={isLoading ? "…" : rejected.toString()}
          variant="danger"
          icon={AlertCircle}
          accent="right"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} onView={handleView} onEdit={handleEdit} />
        ))}

        {!isLoading && packages.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border py-16 text-center">
            <Gift className="mx-auto mb-3 size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No packages yet. Create your first meal package to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
