import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ClipboardList, Clock, ChefHat, CheckCircle2 } from "lucide-react";

export default function KitchenOrdersPage() {
  return (
    <div>
      <PageHeader
        title="Order Queue"
        description="View and manage incoming meal orders."
        icon={ClipboardList}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending" value="12" variant="warning" icon={Clock} accent="right" />
        <StatCard label="Preparing" value="8" icon={ChefHat} accent="right" />
        <StatCard label="Ready" value="5" variant="success" icon={CheckCircle2} accent="right" />
        <StatCard label="Total Today" value="35" variant="default" icon={ClipboardList} accent="right" />
      </div>
    </div>
  );
}
