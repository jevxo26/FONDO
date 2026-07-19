import { Clock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PendingTableSection } from "@/components/dashboard/admin/vendors/pending/pending-table-section";
import { PendingVendorSummaryCards } from "@/components/dashboard/admin/vendors/pending/pending-vendor-summary-cards";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { CheckCircle } from "lucide-react";

export default function VendorsPendingPage() {
  return (
    <div>
      <PageHeader
        title="Pending Approval"
        description="Review and approve newly registered vendors."
        icon={Clock}
      />
      <div className="mt-8">
        <PendingVendorSummaryCards />
      </div>
      <div className="mt-8">
        <PendingTableSection />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        <GlassCard
          icon={<Clock className="size-5 text-warning" />}
          iconBg="bg-warning/10"
          title="Awaiting Review"
          value="2.4 days"
          subtitle="Avg. review time"
          className="flex-1"
        />
        <DarkCard
          icon={<CheckCircle className="size-40" />}
          title="Review Efficiency"
          description="1.8 days faster than last quarter"
          className="flex-1"
        >
          <div className="font-heading text-4xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">67%</div>
          <div className="mt-3 text-sm text-white/70">Approval rate improvement</div>
        </DarkCard>
      </div>
    </div>
  );
}
