// src/components/dashboard/vendor/foods/food-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { AddFoodModal } from "./add-food-modal";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, DollarSign, Package, BookOpen, BarChart, RefreshCw } from "lucide-react";
import { vendorFoods, foodCategories, foodStatuses, stockStatuses, kitchens } from "@/data/vendor-foods";
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

// Map filter values to display labels
const getFilterOptions = (filterValue: string, options: Array<{ value: string; label: string }>) => {
  const found = options.find((opt) => opt.value === filterValue);
  return found ? found.label : filterValue;
};

export function VendorFoodTableSection() {
  const [foods, setFoods] = useState<VendorFood[]>(vendorFoods);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return foods.filter((item) => {
      const matchCategory = filters.category === "ALL" || item.category === filters.category;
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      const matchStockStatus = filters.stockStatus === "ALL" || item.stockStatus === filters.stockStatus;
      const matchKitchen = filters.kitchen === "ALL" || item.kitchen === filters.kitchen;
      return matchCategory && matchStatus && matchStockStatus && matchKitchen;
    });
  }, [foods, filters]);

  const handleFilterChange = useCallback((key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleToggleStatus = useCallback((food: VendorFood) => {
    setFoods((prev) =>
      prev.map((item) =>
        item.id === food.id
          ? { ...item, status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : item
      )
    );
  }, []);

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
    [handleToggleStatus]
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
    []
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
      <AddFoodModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
    </>
  );
}