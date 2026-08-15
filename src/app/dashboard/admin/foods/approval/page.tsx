"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ApprovalTableSection } from "@/components/dashboard/admin/foods/approval/approval-table-section";
import { useGetAdminFoodsQuery } from "@/store/api/slices/admin-food-api";
import { ClipboardCheck, Clock, CheckCircle, XCircle } from "lucide-react";

export default function FoodsApprovalPage() {
  const pending = useGetAdminFoodsQuery({ status: "PENDING", limit: 1 });
  const approved = useGetAdminFoodsQuery({ status: "APPROVED", limit: 1 });
  const rejected = useGetAdminFoodsQuery({ status: "REJECTED", limit: 1 });

  const total = (pending.data?.total ?? 0) + (approved.data?.total ?? 0) + (rejected.data?.total ?? 0);
  const loading = pending.isLoading || approved.isLoading || rejected.isLoading;

  return (
    <div>
      <PageHeader
        title="Approval Queue"
        description="Review and approve vendor-submitted food items."
        icon={ClipboardCheck}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatCard label="Total Items" value={loading ? "…" : total} icon={ClipboardCheck} accent="right" />
        <StatCard
          label="Pending"
          value={loading ? "…" : pending.data?.total ?? 0}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="Approved"
          value={loading ? "…" : approved.data?.total ?? 0}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Rejected"
          value={loading ? "…" : rejected.data?.total ?? 0}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
      </div>
      <div className="mt-8">
        <ApprovalTableSection />
      </div>
    </div>
  );
}
