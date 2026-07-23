// src/components/dashboard/vendor/staff/staff-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { staffColumns } from "./staff-columns";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, UserCog, Trash2 } from "lucide-react";
import { vendorStaff, staffStatuses, staffDesignations, staffShifts, staffBranches } from "@/data/vendor-staff";
import type { VendorStaff } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";
import { AddStaffModal } from "./add-staff-modal";
import { AssignRoleModal } from "./assign-role-modal";

interface Filters {
  status: string;
  designation: string;
  shift: string;
  branch: string;
}

const INITIAL_FILTERS: Filters = {
  status: "ALL",
  designation: "ALL",
  shift: "ALL",
  branch: "ALL",
};

export function VendorStaffTableSection() {
  const [staff, setStaff] = useState<VendorStaff[]>(vendorStaff);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<VendorStaff | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return staff.filter((item) => {
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      const matchDesignation = filters.designation === "ALL" || item.designation === filters.designation;
      const matchShift = filters.shift === "ALL" || item.shift === filters.shift;
      const matchBranch = filters.branch === "ALL" || item.branch === filters.branch;
      return matchStatus && matchDesignation && matchShift && matchBranch;
    });
  }, [staff, filters]);

  const handleFilterChange = useCallback((key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAssignRole = useCallback((staff: VendorStaff) => {
    setSelectedStaff(staff);
    setIsRoleModalOpen(true);
  }, []);

  const rowActions: RowAction<VendorStaff>[] = useMemo(
    () => [
      {
        label: "Edit Staff",
        icon: <Pencil className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (staff: VendorStaff) => console.log("Edit staff", staff),
      },
      {
        label: "Assign Role",
        icon: <UserCog className="h-4 w-4" />,
        variant: "default" as const,
        onClick: handleAssignRole,
      },
      {
        label: "Remove",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive" as const,
        onClick: (staff: VendorStaff) => {
          if (confirm(`Are you sure you want to remove ${staff.fullName}?`)) {
            setStaff((prev) => prev.filter((item) => item.id !== staff.id));
          }
        },
      },
    ],
    [handleAssignRole]
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "status",
        title: "Status",
        options: staffStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "designation",
        title: "Designation",
        options: staffDesignations.map((d) => ({ label: d.label, value: d.value })),
      },
      {
        columnId: "shift",
        title: "Shift",
        options: staffShifts.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "branch",
        title: "Branch",
        options: staffBranches.map((b) => ({ label: b.label, value: b.value })),
      },
    ],
    []
  );

  const toolbarActions = (
    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Staff
    </Button>
  );

  const initialSort: InitialSort = {
    id: "fullName",
    desc: false,
  };

  return (
    <>
      <DataTable
        columns={staffColumns}
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
      <AddStaffModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
      <AssignRoleModal
        open={isRoleModalOpen}
        onOpenChange={setIsRoleModalOpen}
        staff={selectedStaff}
        onAssign={(staff, roles) => {
          console.log("Assign roles", staff, roles);
          setStaff((prev) =>
            prev.map((item) =>
              item.id === staff.id ? { ...item, roles } : item
            )
          );
        }}
      />
    </>
  );
}