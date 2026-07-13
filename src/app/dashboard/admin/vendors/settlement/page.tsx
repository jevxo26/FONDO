import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { VendorFinancialSettlement } from "@/components/dashboard/admin/vendors/financial-settlement";

export default function VendorsSettlementPage() {
  return (
    <div>
      <PageHeader
        title="Settlement"
        description="Manage vendor payouts and settlement reports."
        icon={Wallet}
      />

      <div className="mt-6">
   <VendorFinancialSettlement/>
        
    </div>

  </div>
  );
  
}
