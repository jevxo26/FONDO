// src/components/dashboard/vendor/foods/food-table-section.tsx
"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter, InitialSort, RowAction } from "@/components/common/table/types";
import { Button } from "@/components/ui/button";
import { useGetVendorFoods } from "@/store/api/slices/foods-api";
import type { VendorFood } from "@/types/vendor";
import {
  BarChart,
  BookOpen,
  DollarSign,
  Loader2,
  Package,
  Pencil,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { foodColumns } from "./food-columns";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface VendorFoodTableSectionProps {
  initialFoods: VendorFood[];
}

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

  const handleToggleStatus = useCallback(
    (food: VendorFood) => {
      setLocalFoods((prev) => {
        const base = prev ?? data ?? [];
        return base.map((item) =>
          item.id === food.id
            ? { ...item, status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
            : item,
        );
      });
    },
    [data],
  );

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
        <p className="text-sm text-destructive">Failed to load foods. Please try again.</p>
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
