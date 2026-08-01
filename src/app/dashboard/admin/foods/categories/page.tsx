"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { CategoryTableSection } from "@/components/dashboard/admin/foods/categories/category-table-section";
import { ListTree, CheckCircle, FileEdit } from "lucide-react";
import { useAdminFoodCategories } from "@/store/api/slices/admin-food-api";

export default function FoodsCategoriesPage() {
  const { data: categories } = useAdminFoodCategories();

  const total = categories?.length ?? 0;
  const active = categories?.filter((c) => c.status === "active").length ?? 0;
  const totalSub = categories?.reduce((sum, c) => sum + c.subCategories.length, 0) ?? 0;

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage food categories and sub-categories."
        icon={ListTree}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Total Categories" value={total} icon={ListTree} accent="right" />
        <StatCard
          label="Active"
          value={active}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Sub-Categories"
          value={totalSub}
          variant="warning"
          icon={FileEdit}
          accent="right"
        />
      </div>
      <div className="mt-8">
        <CategoryTableSection />
      </div>
    </div>
  );
}
