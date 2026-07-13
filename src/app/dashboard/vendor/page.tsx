import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Store, Utensils, ClipboardList, DollarSign } from "lucide-react";

export default function VendorOverviewPage() {
  return (
    <div>
      <PageHeader
        title="Vendor Overview"
        description="Monitor your business performance at a glance."
        icon={Store}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Foods" value="47" icon={Utensils} accent="right" />
        <StatCard label="Today's Orders" value="23" variant="success" icon={ClipboardList} accent="right" />
        <StatCard label="Pending" value="5" variant="warning" icon={ClipboardList} accent="right" />
        <StatCard label="Today's Earnings" value="৳12,450" variant="default" icon={DollarSign} accent="right" />
      </div>
    </div>
  );
}
