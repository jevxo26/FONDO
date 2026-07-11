import { Wallet } from "lucide-react";
import { VendorFinancialSettlement } from "@/components/dashboard/vendors/financial-settlement";

export default function VendorsSettlementPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Wallet className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Settlement</h2>
          <p className="mt-1 text-muted-foreground">
            Manage vendor payouts and settlement reports.
          </p>
        </div>
      </div>

      <div className="mt-6">
   <VendorFinancialSettlement/>
        
    </div>

  </div>
  );
  
}
