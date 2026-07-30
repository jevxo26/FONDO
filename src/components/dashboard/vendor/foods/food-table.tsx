// src/components/dashboard/vendor/foods/food-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, DollarSign, Package, BookOpen, BarChart, RefreshCw } from "lucide-react";
import type { VendorFood } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface VendorFoodTableSectionProps {
  initialFoods: VendorFood[];
}

export function VendorFoodTableSection({ initialFoods }: VendorFoodTableSectionProps) {
  const router = useRouter();
  const [foods, setFoods] = useState<VendorFood[]>(initialFoods);

  const handleToggleStatus = useCallback(async (food: VendorFood) => {
    try {
      const newStatus = food.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}/api/vendor/foods/${food.id}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      setFoods((prev) =>
        prev.map((item) => (item.id === food.id ? { ...item, status: newStatus } : item)),
      );

      toast.success(`Food ${newStatus === "ACTIVE" ? "activated" : "deactivated"} successfully`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update status";
      toast.error(message);
    }
  }, []);

  const handleAddFood = useCallback(() => {
    router.push("/dashboard/vendor/foods/add");
  }, [router]);

  const rowActions: RowAction<VendorFood>[] = useMemo(
    () => [
      {
        label: "Edit Mapping",
        icon: <Pencil className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (food: VendorFood) => console.log("Edit mapping", food),
      },
      {
        label: "Update Price",
        icon: <DollarSign className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (food: VendorFood) => console.log("Update price", food),
      },
      {
        label: "Update Stock",
        icon: <Package className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (food: VendorFood) => console.log("Update stock", food),
      },
      {
        label: "View Recipe",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (food: VendorFood) => console.log("View recipe", food),
      },
      {
        label: "View Cost",
        icon: <BarChart className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (food: VendorFood) => console.log("View cost", food),
      },
      {
        label: "Toggle Status",
        icon: <RefreshCw className="h-4 w-4" />,
        variant: "default" as const,
        onClick: handleToggleStatus,
      },
    ],
    [handleToggleStatus],
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "category",
        title: "Category",
        options: [
          { label: "All", value: "ALL" },
          { label: "Appetizer", value: "APPETIZER" },
          { label: "Main Course", value: "MAIN_COURSE" },
          { label: "Dessert", value: "DESSERT" },
          { label: "Beverage", value: "BEVERAGE" },
        ],
      },
      {
        columnId: "status",
        title: "Status",
        options: [
          { label: "All", value: "ALL" },
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
        ],
      },
      {
        columnId: "stockStatus",
        title: "Stock",
        options: [
          { label: "All", value: "ALL" },
          { label: "In Stock", value: "IN_STOCK" },
          { label: "Low Stock", value: "LOW_STOCK" },
          { label: "Out of Stock", value: "OUT_OF_STOCK" },
        ],
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={handleAddFood} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Food
    </Button>
  );

  const initialSort: InitialSort = {
    id: "name",
    desc: false,
  };

  return (
    <DataTable
      columns={foodColumns}
      data={foods}
      pageSize={10}
      enableSorting
      rowActions={rowActions}
      toolbarActions={toolbarActions}
      filters={facetedFilters}
      enableSearch
      enableColumnToggle
      initialSort={initialSort}
    />
  );
}
