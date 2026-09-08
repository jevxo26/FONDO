"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorBranchTableSection } from "@/components/dashboard/vendor/branches/branch-table-section";
import { Building2, CheckCircle, XCircle, MapPin, Loader2 } from "lucide-react";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import { useGetVendorBranchesQuery } from "@/store/api/slices/vendor-api";

export default function VendorBranchesPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const vendorCode = vendor?.vendorCode;

  const { data: branches, isLoading: branchesLoading } = useGetVendorBranchesQuery(
    vendorCode || "",
    {
      skip: !vendorCode,
    },
  );

  const isLoading = vendorLoading || branchesLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Branches"
          description="Manage your business locations and branches."
          icon={Building2}
        />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const items = branches ?? [];
  const totalBranches = items.length;
  const activeBranches = items.filter((b) => b.status === "ACTIVE").length;
  const inactiveBranches = items.filter((b) => b.status === "INACTIVE").length;
  const mainBranch = items.find((b) => b.isMainBranch);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Branches"
        description="Manage your business locations and branches."
        icon={Building2}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Branches"
          value={totalBranches.toString()}
          icon={Building2}
          accent="right"
        />
        <StatCard
          label="Active"
          value={activeBranches.toString()}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Inactive"
          value={inactiveBranches.toString()}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
        <StatCard
          label="Main Branch"
          value={mainBranch?.branchName || "N/A"}
          variant="default"
          icon={MapPin}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-semibold tracking-tight">Branch List</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {activeBranches} Active · {totalBranches} Total
          </p>
        </div>
        <VendorBranchTableSection />
      </div>
    </div>
  );
}
