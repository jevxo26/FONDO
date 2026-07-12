import { Truck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function OrdersDeliveryPage() {
  return (
    <div>
      <PageHeader
        title="Delivery Queue"
        description="Orders out for delivery to customers."
        icon={Truck}
      />
    </div>
  );
}
