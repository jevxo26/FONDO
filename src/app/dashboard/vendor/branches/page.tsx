// src/app/dashboard/vendor/branches/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorBranchTableSection } from "@/components/dashboard/vendor/branches/branch-table-section";
import { Building2, CheckCircle, XCircle, MapPin } from "lucide-react";
import { vendorBranches } from "@/data/vendor-branches";

export default function VendorBranchesPage() {
  const totalBranches = vendorBranches.length;
  const activeBranches = vendorBranches.filter((b) => b.status === "ACTIVE").length;
  const inactiveBranches = vendorBranches.filter((b) => b.status === "INACTIVE").length;
  const mainBranch = vendorBranches.find((b) => b.isMainBranch);

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
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Branch List
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {activeBranches} Active · {totalBranches} Total
          </p>
        </div>
        <VendorBranchTableSection />
      </div>
    </div>
  );
}