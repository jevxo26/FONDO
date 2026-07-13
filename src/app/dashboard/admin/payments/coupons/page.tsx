import { TicketPercent } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function PaymentsCouponsPage() {
  return (
    <div>
      <PageHeader
        title="Coupons"
        description="Manage discount coupons and promotional codes."
        icon={TicketPercent}
      />
    </div>
  );
}
