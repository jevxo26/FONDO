// src/components/dashboard/vendor/foods/food-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { AddFoodModal } from "./add-food-modal";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, DollarSign, Package, BookOpen, BarChart, RefreshCw, Loader2 } from "lucide-react";
import {
  foodCategories,
  foodStatuses,
  stockStatuses,
  kitchens,
} from "@/data/vendor-foods";
import { useGetVendorFoods } from "@/store/api/slices/foods-api";
import type { VendorFood } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";

interface Filters {
  category: string;
  status: string;
  stockStatus: string;
  kitchen: string;
}

const INITIAL_FILTERS: Filters = {
  category: "ALL",
  status: "ALL",
  stockStatus: "ALL",
  kitchen: "ALL",
};

export function VendorFoodTableSection() {
  const { data, isLoading, error } = useGetVendorFoods();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters] = useState<Filters>(INITIAL_FILTERS);
  const [localFoods, setLocalFoods] = useState<VendorFood[] | null>(null);

  const foods = useMemo(() => localFoods ?? data ?? [], [localFoods, data]);

  const filteredData = useMemo(() => {
    return foods.filter((item) => {
      const matchCategory = filters.category === "ALL" || item.category === filters.category;
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      const matchStockStatus =
        filters.stockStatus === "ALL" || item.stockStatus === filters.stockStatus;
      const matchKitchen = filters.kitchen === "ALL" || item.kitchen === filters.kitchen;
      return matchCategory && matchStatus && matchStockStatus && matchKitchen;
    });
  }, [foods, filters]);

  const handleToggleStatus = useCallback((food: VendorFood) => {
    setLocalFoods((prev) => {
      const base = prev ?? data ?? [];
      return base.map((item) =>
        item.id === food.id
          ? { ...item, status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : item,
      );
    });
  }, [data]);

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

  // Build faceted filters for the DataTable
  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "category",
        title: "Category",
        options: foodCategories.map((c) => ({ label: c.label, value: c.value })),
      },
      {
        columnId: "status",
        title: "Status",
        options: foodStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "stockStatus",
        title: "Stock",
        options: stockStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "kitchen",
        title: "Kitchen",
        options: kitchens.map((k) => ({ label: k.label, value: k.value })),
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Food
    </Button>
  );

  const initialSort: InitialSort = {
    id: "name",
    desc: false,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-card py-16">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading foods...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 py-16">
        <p className="text-sm text-destructive">
          Failed to load foods. Please try again.
        </p>
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card py-16">
        <Package className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No foods found yet.</p>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Food
        </Button>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={foodColumns}
        data={filteredData}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        toolbarActions={toolbarActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />
      <AddFoodModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </>
  );
}
