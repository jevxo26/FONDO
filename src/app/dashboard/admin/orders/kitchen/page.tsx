import { CookingPot } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function OrdersKitchenPage() {
  return (
    <div>
      <PageHeader
        title="Kitchen Queue"
        description="Orders currently being prepared in kitchens."
        icon={CookingPot}
      />
    </div>
  );
}
