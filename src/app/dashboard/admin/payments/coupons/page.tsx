import { TicketPercent, CheckCircle, XCircle, Clock, Download, Plus } from "lucide-react";
import { coupons } from "@/data/payments";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { CouponTableSection } from "@/components/dashboard/admin/payments/coupon-table-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Button } from "@/components/ui/button";

export default function PaymentsCouponsPage() {
  const total = coupons.length;
  const active = coupons.filter((c) => c.status === "ACTIVE").length;
  const expired = coupons.filter((c) => c.status === "EXPIRED").length;
  const disabled = coupons.filter((c) => c.status === "DISABLED").length;
  const totalUses = coupons.reduce((s, c) => s + c.usedCount, 0);

  return (
    <div>
      <PageHeader
        title="Coupons"
        description="Manage discount coupons and promotional codes."
        icon={TicketPercent}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" /> Export
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" /> New Coupon
            </Button>
          </>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Coupons" value={total} icon={TicketPercent} accent="right" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Expired" value={expired} variant="warning" icon={Clock} accent="right" />
        <StatCard label="Disabled" value={disabled} variant="danger" icon={XCircle} accent="right" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <CouponTableSection data={coupons} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <DarkCard
            icon={<TicketPercent className="size-40" />}
            title="Coupon Usage"
            description={`${totalUses.toLocaleString()} total redemptions across all codes`}
          >
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Active Codes</p>
                <p className="mt-1 text-base font-bold text-white">{active}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Avg. Usage per Code</p>
                <p className="mt-1 text-base font-bold text-white">{Math.round(totalUses / total)}</p>
              </div>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
