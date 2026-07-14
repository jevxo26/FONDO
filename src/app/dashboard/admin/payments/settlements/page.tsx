import { ArrowLeftRight, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import { settlements } from "@/data/payments";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { SettlementTableSection } from "@/components/dashboard/admin/payments/settlements/settlement-table-section";
import { Button } from "@/components/ui/button";

export default function PaymentsSettlementsPage() {
  const total = settlements.length;
  const completed = settlements.filter((s) => s.status === "COMPLETED").length;
  const pending = settlements.filter((s) => s.status === "PENDING" || s.status === "PROCESSING").length;
  const failed = settlements.filter((s) => s.status === "FAILED").length;

  return (
    <div>
      <PageHeader
        title="Settlements"
        description="Manage platform-wide payment settlements."
        icon={ArrowLeftRight}
        actions={<Button className="rounded-full"><RefreshCw className="size-[18px]" /> Process All</Button>}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Settlements" value={total} icon={ArrowLeftRight} accent="bottom" />
        <StatCard label="Completed" value={completed} variant="success" icon={CheckCircle} accent="bottom" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="bottom" />
        <StatCard label="Failed" value={failed} variant="danger" icon={XCircle} accent="bottom" />
      </div>
      <div className="mt-8">
        <SettlementTableSection data={settlements} />
      </div>
    </div>
  );
}
