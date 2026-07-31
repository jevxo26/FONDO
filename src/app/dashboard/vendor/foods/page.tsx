import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ClientWrapper } from "./client-wrapper";
import { apiFetch } from "@/lib/api";
import type { VendorFood } from "@/types/vendor";

import { Utensils, PlusCircle, AlertCircle, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VendorFoodsPage() {
  const data = await apiFetch<VendorFood[]>("/api/foods/vendor/foods", {
    revalidate: 0,
    tags: ["Food"],
  });

  const foods = data ?? [];
  const activeItems = foods.filter((f) => f.status === "ACTIVE").length;
  const outOfStock = foods.filter((f) => f.stockStatus === "OUT_OF_STOCK").length;
  const lowStock = foods.filter((f) => f.stockStatus === "LOW_STOCK").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Foods"
        description="Manage your food catalog and menu items."
        icon={Utensils}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Items"
          value={foods.length.toString()}
          icon={Utensils}
          accent="right"
        />
        <StatCard
          label="Active"
          value={activeItems.toString()}
          variant="success"
          icon={PlusCircle}
          accent="right"
        />
        <StatCard
          label="Low Stock"
          value={lowStock.toString()}
          variant="warning"
          icon={AlertCircle}
          accent="right"
        />
        <StatCard
          label="Out of Stock"
          value={outOfStock.toString()}
          variant="danger"
          icon={Package}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">Food Items List</h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {activeItems} Active
          </p>
        </div>
        <ClientWrapper initialData={data} />
      </div>
    </div>
  );
}
