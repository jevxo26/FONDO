import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { CategoryTableSection } from "@/components/dashboard/foods/categories/category-table-section";
import { adminCategories } from "@/data/categories-data";
import { ListTree, CheckCircle, FileEdit } from "lucide-react";

export default function FoodsCategoriesPage() {
  const total = adminCategories.length;
  const active = adminCategories.filter((c) => c.status === "ACTIVE").length;
  const totalSub = adminCategories.reduce((sum, c) => sum + c.subCategories.length, 0);

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
