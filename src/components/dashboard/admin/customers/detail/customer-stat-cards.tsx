import { StatCard } from "@/components/dashboard/common/stat-card";
import { ShoppingBag, CreditCard, Package, Wallet } from "lucide-react";

interface CustomerStatCardsProps {
  totalOrders: number;
  totalSpent: number;
  totalSubscriptions: number;
  totalPayments: number;
}

export default function CustomerStatCards({
  totalOrders,
  totalSpent,
  totalSubscriptions,
  totalPayments,
}: CustomerStatCardsProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Orders" value={totalOrders} icon={ShoppingBag} accent="bottom" />
      <StatCard
        label="Total Spent"
        value={`৳${totalSpent.toLocaleString()}`}
        icon={CreditCard}
        accent="bottom"
      />
      <StatCard label="Subscriptions" value={totalSubscriptions} icon={Package} accent="bottom" />
      <StatCard label="Payments" value={totalPayments} icon={Wallet} accent="bottom" />
    </div>
  );
}
