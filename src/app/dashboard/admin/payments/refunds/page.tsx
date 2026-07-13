import { Undo2, CheckCircle, XCircle, Clock, Wallet, Download } from "lucide-react";
import { refunds } from "@/data/payments";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RefundTableSection } from "@/components/dashboard/admin/payments/refund-table-section";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Button } from "@/components/ui/button";

export default function PaymentsRefundsPage() {
  const total = refunds.length;
  const pending = refunds.filter((r) => r.status === "PENDING").length;
  const processed = refunds.filter((r) => r.status === "PROCESSED").length;
  const rejected = refunds.filter((r) => r.status === "REJECTED").length;
  const totalAmount = refunds.reduce((s, r) => s + r.amount, 0);

  return (
    <div>
      <PageHeader
        title="Refunds"
        description="Process and track customer refund requests."
        icon={Undo2}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export Report
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Requests" value={total} icon={Undo2} accent="right" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="right" />
        <StatCard label="Processed" value={processed} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Rejected" value={rejected} variant="danger" icon={XCircle} accent="right" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <GlassCard
            icon={<Wallet className="size-5 text-warning" />}
            iconBg="bg-warning/10"
            title="Total Refund Amount"
            value={`৳${totalAmount.toLocaleString()}`}
            subtitle={`Across ${total} requests`}
          >
            <div className="mt-4">
              <div className="mb-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-warning"
                  style={{ width: `${(processed / total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {processed} of {total} processed
              </span>
            </div>
          </GlassCard>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <RefundTableSection data={refunds} />
        </div>
      </div>
    </div>
  );
}
