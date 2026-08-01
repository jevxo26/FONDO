"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { FoodTableSection } from "@/components/dashboard/admin/foods/all-foods/food-table-section";
import { Button } from "@/components/ui/button";
import { useAdminFoods } from "@/store/api/slices/admin-food-api";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Archive, CheckCircle, FileEdit, Plus, Utensils } from "lucide-react";

export default function FoodsPage() {
  const router = useRouter();
  const { data, isLoading } = useAdminFoods({ limit: 500 });

  const items = useMemo(() => data?.items ?? [], [data]);

  const total = items.length;
  const active = items.filter((f) => f.status === "ACTIVE").length;
  const draft = items.filter((f) => f.status === "DRAFT").length;
  const archived = items.filter((f) => f.status === "ARCHIVED").length;

  return (
    <div>
      <PageHeader
        title="All Foods"
        description="Browse and manage all food items across vendors."
        icon={Utensils}
        actions={
          <Button
            className="rounded-full"
            onClick={() => router.push("/dashboard/admin/foods/add")}
          >
            <Plus className="size-[18px]" />
            Add Food
          </Button>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Foods"
          value={isLoading ? "—" : total}
          icon={Utensils}
          accent="right"
        />
        <StatCard
          label="Active"
          value={isLoading ? "—" : active}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Draft"
          value={isLoading ? "—" : draft}
          variant="warning"
          icon={FileEdit}
          accent="right"
        />
        <StatCard
          label="Archived"
          value={isLoading ? "—" : archived}
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
