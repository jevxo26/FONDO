import { TicketPercent } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PaymentCoupons } from "@/components/dashboard/admin/payments/payment-coupons";

export default function PaymentsCouponsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Coupons" description="Manage discount coupons and promotional codes." icon={TicketPercent} />
      <PaymentCoupons />
    </div>
  );
}
