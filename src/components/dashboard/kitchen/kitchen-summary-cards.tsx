import { ListOrdered, CookingPot, UtensilsCrossed, Package } from "lucide-react";
import { StatCard } from "@/components/dashboard/common/stat-card";

interface KitchenSummaryCardsProps {
  queued: number;
  preparing: number;
  ready: number;
  total: number;
}

export function KitchenSummaryCards({ queued, preparing, ready, total }: KitchenSummaryCardsProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Queued" value={queued} variant="warning" icon={ListOrdered} accent="right" />
      <StatCard label="In Preparation" value={preparing} icon={CookingPot} accent="right" />
      <StatCard label="Ready" value={ready} variant="success" icon={UtensilsCrossed} accent="right" />
      <StatCard label="Total Today" value={total} variant="default" icon={Package} accent="right" />
    </div>
  );
}
