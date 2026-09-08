"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorFoodTableSection } from "@/components/dashboard/vendor/foods/food-table-section";
import { useGetVendorFoodsQuery } from "@/store/api/slices/foods-api";
import { AlertCircle, Package, PlusCircle, Utensils, Loader2 } from "lucide-react";

export default function VendorFoodsPage() {
  const { data: foods, isLoading } = useGetVendorFoodsQuery();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="My Foods"
          description="Manage your food catalog and menu items."
          icon={Utensils}
        />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const items = foods ?? [];
  const activeItems = items.filter((f) => f.status === "ACTIVE").length;
  const outOfStock = items.filter((f) => f.stockStatus === "OUT_OF_STOCK").length;
  const lowStock = items.filter((f) => f.stockStatus === "LOW_STOCK").length;

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
          value={items.length.toString()}
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
          <h3 className="font-heading text-xl font-semibold tracking-tight">Food Items List</h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {activeItems} Active
          </p>
        </div>
        <VendorFoodTableSection />
      </div>
    </div>
  );
}
