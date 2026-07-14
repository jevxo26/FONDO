import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ApprovalTableSection } from "@/components/dashboard/admin/foods/approval/approval-table-section";
import { approvalItems } from "@/data/food-approvals";
import { ClipboardCheck, Clock, CheckCircle, XCircle } from "lucide-react";

export default function FoodsApprovalPage() {
  const total = approvalItems.length;
  const pending = approvalItems.filter((i) => i.status === "PENDING").length;
  const approved = approvalItems.filter((i) => i.status === "APPROVED").length;
  const rejected = approvalItems.filter((i) => i.status === "REJECTED").length;

  return (
    <div>
      <PageHeader
        title="Approval Queue"
        description="Review and approve vendor-submitted food items."
        icon={ClipboardCheck}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatCard label="Total Items" value={total} icon={ClipboardCheck} accent="right" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="right" />
        <StatCard label="Approved" value={approved} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Rejected" value={rejected} variant="danger" icon={XCircle} accent="right" />
      </div>
      <div className="mt-8">
        <ApprovalTableSection />
      </div>
    </div>
  );
}
