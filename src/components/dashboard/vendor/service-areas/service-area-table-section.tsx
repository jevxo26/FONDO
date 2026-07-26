// src/components/dashboard/vendor/service-areas/service-area-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { serviceAreaColumns } from "./service-area-columns";
import { AddServiceAreaModal } from "./add-service-area-modal";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Power, Trash2 } from "lucide-react";
import { vendorServiceAreas, divisions, districts } from "@/data/vendor-service-areas";
import type { VendorServiceArea } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";

interface Filters {
  division: string;
  district: string;
  isActive: string;
}

const INITIAL_FILTERS: Filters = {
  division: "ALL",
  district: "ALL",
  isActive: "ALL",
};

export function VendorServiceAreaTableSection() {
  const [areas, setAreas] = useState<VendorServiceArea[]>(vendorServiceAreas);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return areas.filter((item) => {
      const matchDivision = filters.division === "ALL" || item.division === filters.division;
      const matchDistrict = filters.district === "ALL" || item.district === filters.district;
      const matchStatus = filters.isActive === "ALL" || 
        (filters.isActive === "true" ? item.isActive : !item.isActive);
      return matchDivision && matchDistrict && matchStatus;
    });
  }, [areas, filters]);

  const handleFilterChange = useCallback((key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleToggleStatus = useCallback((area: VendorServiceArea) => {
    setAreas((prev) =>
      prev.map((item) =>
        item.id === area.id
          ? { 
              ...item, 
              isActive: !item.isActive,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const rowActions: RowAction<VendorServiceArea>[] = useMemo(
    () => [
      {
        label: "Edit Area",
        icon: <Pencil className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (area: VendorServiceArea) => console.log("Edit area", area),
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
        onClick: (area: VendorServiceArea) => {
          if (confirm(`Are you sure you want to delete ${area.area} service area?`)) {
            setAreas((prev) => prev.filter((item) => item.id !== area.id));
          }
        },
      },
    ],
    [handleToggleStatus]
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "division",
        title: "Division",
        options: divisions.map((d) => ({ label: d.label, value: d.value })),
      },
      {
        columnId: "district",
        title: "District",
        options: districts.map((d) => ({ label: d.label, value: d.value })),
      },
      {
        columnId: "isActive",
        title: "Status",
        options: [
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ],
      },
    ],
    []
  );

  const toolbarActions = (
    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Area
    </Button>
  );

  // Changed from "area" to "area" - but since that doesn't exist, use a valid column
  const initialSort: InitialSort = {
    id: "deliveryCharge", // Changed from "area" to "deliveryCharge"
    desc: false,
  };

  return (
    <>
      <DataTable
        columns={serviceAreaColumns}
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
      <AddServiceAreaModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
}