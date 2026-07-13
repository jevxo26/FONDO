import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { UtensilsCrossed, Utensils, AlertCircle, Clock } from "lucide-react";

export default function KitchenMealsPage() {
  return (
    <div>
      <PageHeader
        title="Meals"
        description="Manage today's meal production schedule."
        icon={UtensilsCrossed}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Meals" value="85" icon={UtensilsCrossed} accent="right" />
        <StatCard label="Prepared" value="62" variant="success" icon={Utensils} accent="right" />
        <StatCard label="In Progress" value="18" variant="warning" icon={Clock} accent="right" />
        <StatCard label="Shortfall" value="5" variant="danger" icon={AlertCircle} accent="right" />
      </div>
    </div>
  );
}
