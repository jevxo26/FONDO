"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { useListAdminPackagesQuery } from "@/store/api/slices/packages-api";
import { PackageApprovalTableSection } from "@/components/dashboard/admin/packages/approval/approval-table-section";
import { ClipboardCheck, Clock, CheckCircle, XCircle } from "lucide-react";

export default function PackagesApprovalPage() {
  const pending = useListAdminPackagesQuery({ status: "PENDING", limit: 1 });
  const approved = useListAdminPackagesQuery({ status: "APPROVED", limit: 1 });
  const rejected = useListAdminPackagesQuery({ status: "REJECTED", limit: 1 });

  const total =
    (pending.data?.pagination?.total ?? 0) +
    (approved.data?.pagination?.total ?? 0) +
    (rejected.data?.pagination?.total ?? 0);
  const loading = pending.isLoading || approved.isLoading || rejected.isLoading;

  return (
    <div>
      <PageHeader
        title="Package Approval Queue"
        description="Review and approve vendor-submitted packages."
        icon={ClipboardCheck}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatCard label="Total Packages" value={loading ? "…" : total} icon={ClipboardCheck} accent="right" />
        <StatCard
          label="Pending"
          value={loading ? "…" : pending.data?.pagination?.total ?? 0}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Approved"
          value={loading ? "…" : approved.data?.pagination?.total ?? 0}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Rejected"
          value={loading ? "…" : rejected.data?.pagination?.total ?? 0}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
      </div>
      <div className="mt-8">
        <PackageApprovalTableSection />
      </div>
    </div>
  );
}
