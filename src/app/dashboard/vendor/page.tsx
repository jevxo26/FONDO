"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { useGetFoodsQuery } from "@/store/api/slices/foods-api";
import { useGetOrdersQuery } from "@/store/api/slices/orders-api";
import { ClipboardList, DollarSign, Loader2, Store, Utensils } from "lucide-react";

export default function VendorOverviewPage() {
  const { data: apiOrders, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: apiFoods, isLoading: foodsLoading } = useGetFoodsQuery({});

  const totalFoods = apiFoods?.items ? apiFoods.items.length : 47;
  const totalOrders = apiOrders ? apiOrders.length : 23;
  const pendingOrders = apiOrders
    ? apiOrders.filter((o) => o.status === "PENDING" || o.status === "PREPARING").length
    : 5;

  const isLoading = ordersLoading || foodsLoading;

  return (
    <div>
      <PageHeader
        title="Vendor Overview"
        description="Monitor your business performance at a glance."
        icon={Store}
      />

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Foods" value={totalFoods} icon={Utensils} accent="right" />
          <StatCard
            label="Today's Orders"
            value={totalOrders}
            variant="success"
            icon={ClipboardList}
            accent="right"
          />
          <StatCard
            label="Pending"
            value={pendingOrders}
            variant="warning"
            icon={ClipboardList}
            accent="right"
          />
          <StatCard
            label="Today's Earnings"
            value="৳12,450"
            variant="default"
            icon={DollarSign}
            accent="right"
          />
        </div>
      )}
    </div>
  );
}
