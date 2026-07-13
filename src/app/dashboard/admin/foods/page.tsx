import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { FoodTableSection } from "@/components/dashboard/admin/foods/all-foods/food-table-section";
import { Button } from "@/components/ui/button";
import { adminFoods } from "@/data/foods";
import { Archive, CheckCircle, Download, FileEdit, Utensils } from "lucide-react";

export default function FoodsPage() {
  const total = adminFoods.length;
  const active = adminFoods.filter((f) => f.status === "ACTIVE").length;
  const draft = adminFoods.filter((f) => f.status === "DRAFT").length;
  const archived = adminFoods.filter((f) => f.status === "ARCHIVED").length;

  return (
    <div>
      <PageHeader
        title="All Foods"
        description="Browse and manage all food items across vendors."
        icon={Utensils}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" />
            Export Report
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Foods" value={total} icon={Utensils} accent="right" />
        <StatCard
          label="Active"
          value={active}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard label="Draft" value={draft} variant="warning" icon={FileEdit} accent="right" />
        <StatCard
          label="Archived"
          value={archived}
          variant="danger"
          icon={Archive}
          accent="right"
        />
      </div>
      <div className="mt-8">
        <FoodTableSection />
      </div>
    </div>
  );
}
