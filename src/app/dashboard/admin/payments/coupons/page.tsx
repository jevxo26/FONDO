import { TicketPercent, CheckCircle, XCircle, Clock, Download, Plus } from "lucide-react";
import { coupons } from "@/data/payments";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { CouponTableSection } from "@/components/dashboard/admin/payments/coupon-table-section";
import { Button } from "@/components/ui/button";

export default function PaymentsCouponsPage() {
  const total = coupons.length;
  const active = coupons.filter((c) => c.status === "ACTIVE").length;
  const expired = coupons.filter((c) => c.status === "EXPIRED").length;
  const disabled = coupons.filter((c) => c.status === "DISABLED").length;

  return (
    <div>
      <PageHeader
        title="Coupons"
        description="Manage discount coupons and promotional codes."
        icon={TicketPercent}
        actions={
          <>
            <Button variant="outline" className="rounded-full"><Download className="size-[18px]" /> Export</Button>
            <Button className="rounded-full"><Plus className="size-[18px]" /> New Coupon</Button>
          </>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Coupons" value={total} icon={TicketPercent} accent="top" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="top" />
        <StatCard label="Expired" value={expired} variant="warning" icon={Clock} accent="top" />
        <StatCard label="Disabled" value={disabled} variant="danger" icon={XCircle} accent="top" />
      </div>
      <div className="mt-8">
        <CouponTableSection data={coupons} />
      </div>
    </div>
  );
}
