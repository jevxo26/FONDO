"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/common/table";
import { settlementColumns } from "./settlement-columns";
import { walletColumns } from "./wallet-columns";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { settlementStatuses, transactionTypes } from "@/data/vendor-earnings";
import type { VendorSettlement, VendorWalletTransaction } from "@/types/wallet";
import type { FacetedFilter, InitialSort } from "@/components/common/table/types";

interface EarningsTableSectionProps {
  settlements: VendorSettlement[];
  transactions: VendorWalletTransaction[];
  isLoading?: boolean;
}

export function EarningsTableSection({
  settlements,
  transactions,
  isLoading,
}: EarningsTableSectionProps) {
  const filteredSettlements = useMemo(() => {
    return settlements;
  }, [settlements]);

  const filteredWalletTransactions = useMemo(() => {
    return transactions;
  }, [transactions]);

  const settlementFiltersConfig: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "paymentStatus",
        title: "Status",
        options: settlementStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    [],
  );

  const walletFiltersConfig: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "transactionType",
        title: "Type",
        options: transactionTypes.map((t) => ({ label: t.label, value: t.value })),
      },
    ],
    [],
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

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Settlements Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold tracking-tight">Settlements</h3>
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
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            Wallet Transactions
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Balance: ৳{transactions[transactions.length - 1]?.balanceAfter?.toLocaleString() || "0"}
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
