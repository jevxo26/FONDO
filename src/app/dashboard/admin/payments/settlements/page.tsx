import { ArrowLeftRight, CheckCircle, Clock, XCircle, RefreshCw, Download } from "lucide-react";
import { settlements } from "@/data/payments";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { SettlementTableSection } from "@/components/dashboard/admin/payments/settlement-table-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function PaymentsSettlementsPage() {
  const total = settlements.length;
  const completed = settlements.filter((s) => s.status === "COMPLETED").length;
  const pending = settlements.filter((s) => s.status === "PENDING" || s.status === "PROCESSING").length;
  const failed = settlements.filter((s) => s.status === "FAILED").length;
  const totalNet = settlements.reduce((s, st) => s + st.netAmount, 0);
  const pendingNet = settlements.filter((s) => s.status !== "COMPLETED").reduce((s, st) => s + st.netAmount, 0);

  return (
    <div>
      <PageHeader
        title="Settlements"
        description="Manage platform-wide payment settlements."
        icon={ArrowLeftRight}
        actions={
          <Button className="rounded-full">
            <RefreshCw className="size-[18px]" /> Process All
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Settlements" value={total} icon={ArrowLeftRight} accent="right" />
        <StatCard label="Completed" value={completed} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="right" />
        <StatCard label="Failed" value={failed} variant="danger" icon={XCircle} accent="right" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SettlementTableSection data={settlements} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <GlassCard
            icon={<ArrowLeftRight className="size-5 text-primary" />}
            title="Total Payout"
            value={`৳${totalNet.toLocaleString()}`}
            subtitle="All settlements"
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Processed</span>
                <span className="text-sm font-bold text-success">৳{(totalNet - pendingNet).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-xs font-semibold text-muted-foreground">Awaiting</span>
                <span className="text-sm font-bold text-warning">৳{pendingNet.toLocaleString()}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
