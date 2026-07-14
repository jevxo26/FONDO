import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ChefHat, Clock, ListOrdered, UtensilsCrossed } from "lucide-react";

export default function KitchenQueuePage() {
  return (
    <div>
      <PageHeader
        title="Today's Kitchen Queue"
        description="View and manage today's meal preparation queue."
        icon={ChefHat}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Queued" value="12" icon={ListOrdered} accent="right" />
        <StatCard label="In Preparation" value="8" variant="warning" icon={Clock} accent="right" />
        <StatCard label="Ready" value="5" variant="success" icon={UtensilsCrossed} accent="right" />
      </div>
    </div>
  );
}
