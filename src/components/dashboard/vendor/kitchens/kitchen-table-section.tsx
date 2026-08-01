// src/components/dashboard/vendor/kitchens/kitchen-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/table";
import { kitchenColumns } from "./kitchen-columns";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Power, Trash2 } from "lucide-react";
import { vendorKitchens, kitchenStatuses, branches } from "@/data/vendor-kitchens";
import type { VendorKitchen } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { toast } from "sonner";

interface Filters {
  status: string;
  branch: string;
}

const INITIAL_FILTERS: Filters = {
  status: "ALL",
  branch: "ALL",
};

export function VendorKitchenTableSection() {
  const router = useRouter();
  const [kitchens, setKitchens] = useState<VendorKitchen[]>(vendorKitchens);
  const [filters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return kitchens.filter((item) => {
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      const matchBranch = filters.branch === "ALL" || item.branch === filters.branch;
      return matchStatus && matchBranch;
    });
  }, [kitchens, filters]);

  const handleToggleStatus = useCallback((kitchen: VendorKitchen) => {
    setKitchens((prev) =>
      prev.map((item) =>
        item.id === kitchen.id
          ? {
              ...item,
              status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
    toast.success(
      `Kitchen ${kitchen.status === "ACTIVE" ? "deactivated" : "activated"} successfully`,
    );
  }, []);

  const handleAddKitchen = useCallback(() => {
    router.push("/dashboard/vendor/kitchens/add");
  }, [router]);

  const handleEditKitchen = useCallback(
    (kitchen: VendorKitchen) => {
      router.push(`/dashboard/vendor/kitchens/${kitchen.id}/edit`);
    },
    [router],
  );

  const handleDeleteKitchen = useCallback((kitchen: VendorKitchen) => {
    if (confirm(`Are you sure you want to delete ${kitchen.name}?`)) {
      setKitchens((prev) => prev.filter((item) => item.id !== kitchen.id));
      toast.success("Kitchen deleted successfully");
    }
  }, []);

  const rowActions: RowAction<VendorKitchen>[] = useMemo(
    () => [
      {
        label: "Edit Kitchen",
        icon: <Pencil className="h-4 w-4" />,
        variant: "default" as const,
        onClick: handleEditKitchen,
      },
      {
        label: "Toggle Status",
        icon: <Power className="h-4 w-4" />,
        variant: "default" as const,
        onClick: handleToggleStatus,
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive" as const,
        onClick: handleDeleteKitchen,
      },
    ],
    [handleToggleStatus, handleEditKitchen, handleDeleteKitchen],
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "status",
        title: "Status",
        options: kitchenStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "branch",
        title: "Branch",
        options: branches.map((b) => ({ label: b.label, value: b.value })),
      },
    ],
    [],
  );

  const toolbarActions = (
    <Button onClick={handleAddKitchen} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Kitchen
    </Button>
  );

  const initialSort: InitialSort = {
    id: "name",
    desc: false,
  };

  return (
    <DataTable
      columns={kitchenColumns}
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
  );
}
