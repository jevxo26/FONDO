import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Utensils, PlusCircle, AlertCircle, TrendingUp } from "lucide-react";

export default function VendorFoodsPage() {
  return (
    <div>
      <PageHeader
        title="My Foods"
        description="Manage your food catalog and menu items."
        icon={Utensils}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Items" value="47" icon={Utensils} accent="right" />
        <StatCard label="Active" value="42" variant="success" icon={PlusCircle} accent="right" />
        <StatCard label="Out of Stock" value="5" variant="warning" icon={AlertCircle} accent="right" />
        <StatCard label="Top Seller" value="15 orders" variant="default" icon={TrendingUp} accent="right" />
      </div>
    </div>
  );
}
