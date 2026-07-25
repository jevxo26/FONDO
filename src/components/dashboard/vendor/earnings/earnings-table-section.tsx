// src/components/dashboard/vendor/earnings/earnings-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { settlementColumns } from "./settlement-columns";
import { walletColumns } from "./wallet-columns";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { vendorSettlements, vendorWalletTransactions, settlementStatuses, transactionTypes } from "@/data/vendor-earnings";
import type { VendorSettlement, VendorWalletTransaction } from "@/types/vendor";
import type { FacetedFilter, InitialSort } from "@/components/common/table/types";

interface SettlementFilters {
  paymentStatus: string;
}

interface WalletFilters {
  transactionType: string;
}

const INITIAL_SETTLEMENT_FILTERS: SettlementFilters = {
  paymentStatus: "ALL",
};

const INITIAL_WALLET_FILTERS: WalletFilters = {
  transactionType: "ALL",
};

export function EarningsTableSection() {
  const [settlements, setSettlements] = useState<VendorSettlement[]>(vendorSettlements);
  const [walletTransactions, setWalletTransactions] = useState<VendorWalletTransaction[]>(vendorWalletTransactions);
  const [settlementFilters, setSettlementFilters] = useState<SettlementFilters>(INITIAL_SETTLEMENT_FILTERS);
  const [walletFilters, setWalletFilters] = useState<WalletFilters>(INITIAL_WALLET_FILTERS);

  const filteredSettlements = useMemo(() => {
    return settlements.filter((item) => {
      const matchStatus = settlementFilters.paymentStatus === "ALL" || item.paymentStatus === settlementFilters.paymentStatus;
      return matchStatus;
    });
  }, [settlements, settlementFilters]);

  const filteredWalletTransactions = useMemo(() => {
    return walletTransactions.filter((item) => {
      const matchType = walletFilters.transactionType === "ALL" || item.transactionType === walletFilters.transactionType;
      return matchType;
    });
  }, [walletTransactions, walletFilters]);

  const handleSettlementFilterChange = useCallback((key: keyof SettlementFilters) => (value: string) => {
    setSettlementFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleWalletFilterChange = useCallback((key: keyof WalletFilters) => (value: string) => {
    setWalletFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const settlementFiltersConfig: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "paymentStatus",
        title: "Status",
        options: settlementStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    []
  );

  const walletFiltersConfig: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "transactionType",
        title: "Type",
        options: transactionTypes.map((t) => ({ label: t.label, value: t.value })),
      },
    ],
    []
  );

  const toolbarActions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="h-9 gap-1.5">
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Export</span>
      </Button>
      <Button variant="outline" size="sm" className="h-9 gap-1.5">
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline">Date Range</span>
      </Button>
    </div>
  );

  const initialSort: InitialSort = {
    id: "createdAt",
    desc: true,
  };

  return (
    <div className="space-y-8">
      {/* Settlements Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-lg font-semibold tracking-tight">
            Settlements
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {settlements.filter((s) => s.paymentStatus === "PAID").length} Paid
          </p>
        </div>
        <DataTable
          columns={settlementColumns}
          data={filteredSettlements}
          pageSize={5}
          enableSorting
          toolbarActions={toolbarActions}
          filters={settlementFiltersConfig}
          enableSearch
          enableColumnToggle
          initialSort={initialSort}
        />
      </div>

      {/* Wallet Transactions Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-lg font-semibold tracking-tight">
            Wallet Transactions
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Balance: ৳{walletTransactions[walletTransactions.length - 1]?.balanceAfter?.toLocaleString() || "0"}
          </p>
        </div>
        <DataTable
          columns={walletColumns}
          data={filteredWalletTransactions}
          pageSize={5}
          enableSorting
          toolbarActions={toolbarActions}
          filters={walletFiltersConfig}
          enableSearch
          enableColumnToggle
          initialSort={initialSort}
        />
      </div>
    </div>
  );
}