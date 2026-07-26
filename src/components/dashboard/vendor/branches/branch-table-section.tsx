// src/components/dashboard/vendor/branches/branch-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { branchColumns } from "./branch-columns";
import { AddBranchModal } from "./add-branch-modal";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Star, Power, Trash2 } from "lucide-react";
import { vendorBranches, branchStatuses } from "@/data/vendor-branches";
import type { VendorBranch } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";

interface Filters {
  status: string;
}

const INITIAL_FILTERS: Filters = {
  status: "ALL",
};

export function VendorBranchTableSection() {
  const [branches, setBranches] = useState<VendorBranch[]>(vendorBranches);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return branches.filter((item) => {
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      return matchStatus;
    });
  }, [branches, filters]);

  const handleFilterChange = useCallback((key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSetMainBranch = useCallback((branch: VendorBranch) => {
    setBranches((prev) =>
      prev.map((item) => ({
        ...item,
        isMainBranch: item.id === branch.id,
      }))
    );
  }, []);

  const handleToggleStatus = useCallback((branch: VendorBranch) => {
    setBranches((prev) =>
      prev.map((item) =>
        item.id === branch.id
          ? { 
              ...item, 
              status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const rowActions: RowAction<VendorBranch>[] = useMemo(
    () => [
      {
        label: "Edit Branch",
        icon: <Pencil className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (branch: VendorBranch) => console.log("Edit branch", branch),
      },
      {
        label: "Set as Main",
        icon: <Star className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (branch: VendorBranch) => {
          if (!branch.isMainBranch) {
            handleSetMainBranch(branch);
          }
        },
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
        onClick: (branch: VendorBranch) => {
          if (branch.isMainBranch) {
            alert("Cannot delete the main branch. Please set another branch as main first.");
            return;
          }
          if (confirm(`Are you sure you want to delete ${branch.branchName}?`)) {
            setBranches((prev) => prev.filter((item) => item.id !== branch.id));
          }
        },
      },
    ],
    [handleSetMainBranch, handleToggleStatus]
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "status",
        title: "Status",
        options: branchStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    []
  );

  const toolbarActions = (
    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Branch
    </Button>
  );

  const initialSort: InitialSort = {
    id: "branchName",
    desc: false,
  };

  return (
    <>
      <DataTable
        columns={branchColumns}
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
      <AddBranchModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
}