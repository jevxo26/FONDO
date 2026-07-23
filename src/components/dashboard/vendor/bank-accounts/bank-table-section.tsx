// src/components/dashboard/vendor/bank-accounts/bank-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { bankColumns } from "./bank-columns";
import { AddBankModal } from "./add-bank-modal";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Star, Power, Trash2 } from "lucide-react";
import { vendorBankAccounts, bankAccountTypes, bankNames } from "@/data/vendor-bank-accounts";
import type { VendorBankAccount } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";

interface Filters {
  accountType: string;
  bankName: string;
  status: string;
}

const INITIAL_FILTERS: Filters = {
  accountType: "ALL",
  bankName: "ALL",
  status: "ALL",
};

export function VendorBankTableSection() {
  const [accounts, setAccounts] = useState<VendorBankAccount[]>(vendorBankAccounts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return accounts.filter((item) => {
      const matchType = filters.accountType === "ALL" || item.accountType === filters.accountType;
      const matchBank = filters.bankName === "ALL" || item.bankName === filters.bankName;
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      return matchType && matchBank && matchStatus;
    });
  }, [accounts, filters]);

  const handleFilterChange = useCallback((key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSetPrimary = useCallback((account: VendorBankAccount) => {
    setAccounts((prev) =>
      prev.map((item) => ({
        ...item,
        isPrimary: item.id === account.id,
      }))
    );
  }, []);

  const handleToggleStatus = useCallback((account: VendorBankAccount) => {
    setAccounts((prev) =>
      prev.map((item) =>
        item.id === account.id
          ? { 
              ...item, 
              status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const rowActions: RowAction<VendorBankAccount>[] = useMemo(
    () => [
      {
        label: "Edit Account",
        icon: <Pencil className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (account: VendorBankAccount) => console.log("Edit account", account),
      },
      {
        label: "Set as Primary",
        icon: <Star className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (account: VendorBankAccount) => {
          if (!account.isPrimary) {
            handleSetPrimary(account);
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
        onClick: (account: VendorBankAccount) => {
          if (account.isPrimary) {
            alert("Cannot delete the primary account. Please set another account as primary first.");
            return;
          }
          if (confirm(`Are you sure you want to delete ${account.bankName} account?`)) {
            setAccounts((prev) => prev.filter((item) => item.id !== account.id));
          }
        },
      },
    ],
    [handleSetPrimary, handleToggleStatus]
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "accountType",
        title: "Type",
        options: bankAccountTypes.map((t) => ({ label: t.label, value: t.value })),
      },
      {
        columnId: "bankName",
        title: "Bank",
        options: bankNames.map((b) => ({ label: b.label, value: b.value })),
      },
      {
        columnId: "status",
        title: "Status",
        options: bankAccountTypes.map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    []
  );

  const toolbarActions = (
    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Account
    </Button>
  );

  const initialSort: InitialSort = {
    id: "bankName",
    desc: false,
  };

  return (
    <>
      <DataTable
        columns={bankColumns}
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
      <AddBankModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
}