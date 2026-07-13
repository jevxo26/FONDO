import { VendorPerformance } from "@/components/dashboard/vendors/vendor-performance";
import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function VendorsPerformancePage() {
  return (
    <div>
      <PageHeader
        title="Vendor Performance"
        description="Analyze vendor performance metrics and ratings."
        icon={TrendingUp}
      />
      <div className="mt-6">
              <VendorPerformance/>
            </div>
    </div>
  );
}
