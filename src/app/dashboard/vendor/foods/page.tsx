// src/app/dashboard/vendor/foods/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";

import { Utensils, PlusCircle, AlertCircle, TrendingUp, Package } from "lucide-react";
import { vendorFoods } from "@/data/vendor-foods";
import { VendorFoodTableSection } from "@/components/dashboard/vendor/foods/food-table";

export default function VendorFoodsPage() {
  const totalItems = vendorFoods.length;
  const activeItems = vendorFoods.filter((f) => f.status === "ACTIVE").length;
  const outOfStock = vendorFoods.filter((f) => f.stockStatus === "OUT_OF_STOCK").length;
  const lowStock = vendorFoods.filter((f) => f.stockStatus === "LOW_STOCK").length;
  
  // Find top seller (most orders)
  const topSeller = vendorFoods.reduce((max, food) => 
    food.totalOrders > max.totalOrders ? food : max
  );

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
          value={totalItems.toString()}
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
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Food Items List
          </h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {vendorFoods.filter((f) => f.status === "ACTIVE").length} Active
          </p>
        </div>
        <VendorFoodTableSection />
      </div>
    </div>
  );
}