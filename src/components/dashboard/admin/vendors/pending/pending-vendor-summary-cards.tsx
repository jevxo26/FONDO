import { pendingVendors } from "@/data/vendors";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Clock, CheckCircle, XCircle, FileText } from "lucide-react";

export function PendingVendorSummaryCards() {
  const total = pendingVendors.length;
  const pending = pendingVendors.filter((v) => v.status === "Pending").length;
  const docsPending = pendingVendors.filter((v) => v.status === "Documents Pending").length;
  const approved = pendingVendors.filter((v) => v.status === "Approved").length;
  const pendingCount = pending + docsPending;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <DarkCard
        icon={<Clock className="size-10" />}
        title="Approval Queue"
        description={`${pendingCount} vendors awaiting decision`}
        className="flex-1"
      >
        <div className="mb-6">
          <span className="font-fraunces text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {pendingCount}
          </span>
          <p className="mt-1 text-sm text-white/70">
            of {total} total applications
          </p>
        </div>
        <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending</p>
            <p className="font-bold text-warning">{pending}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Docs Pending</p>
            <p className="font-bold text-primary">{docsPending}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Approved</p>
            <p className="font-bold text-success">{approved}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg Review</p>
            <p className="font-bold text-white">2.4 days</p>
          </div>
        </div>
      </DarkCard>
      <GlassCard
        icon={<FileText className="size-5 text-warning" />}
        iconBg="bg-warning/10"
        title="Pending Review"
        value={pending.toString()}
        subtitle="Awaiting admin review"
        className="flex-1"
      >
        <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          {docsPending} more need document verification
        </div>
      </GlassCard>
      <GlassCard
        icon={<XCircle className="size-5 text-destructive" />}
        iconBg="bg-destructive/10"
        title="Rejected Rate"
        value={pendingVendors.filter((v) => v.status === "Rejected").length === 0 ? "0%" : `${Math.round((pendingVendors.filter((v) => v.status === "Rejected").length / total) * 100)}%`}
        subtitle="Of total applications"
        className="flex-1"
      >
        <div className="mt-4 text-xs text-muted-foreground">
          Common reason: incomplete documentation
        </div>
      </GlassCard>
    </div>
  );
}
