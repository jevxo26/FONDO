// src/components/dashboard/vendor/orders/order-table-section.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { orderColumns } from "./order-columns";
import { OrderDetailModal } from "./order-detail-modal";
import { Button } from "@/components/ui/button";
import { Eye, Package, RefreshCw, XCircle } from "lucide-react";
import { vendorOrders, orderStatuses, paymentStatuses } from "@/data/vendor-orders";
import type { VendorOrder } from "@/types/vendor";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";

interface Filters {
  status: string;
  paymentStatus: string;
}

const INITIAL_FILTERS: Filters = {
  status: "ALL",
  paymentStatus: "ALL",
};

export function VendorOrderTableSection() {
  const [orders, setOrders] = useState<VendorOrder[]>(vendorOrders);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<VendorOrder | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return orders.filter((item) => {
      const matchStatus = filters.status === "ALL" || item.status === filters.status;
      const matchPayment = filters.paymentStatus === "ALL" || item.paymentStatus === filters.paymentStatus;
      return matchStatus && matchPayment;
    });
  }, [orders, filters]);

  const handleFilterChange = useCallback((key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleViewOrder = useCallback((order: VendorOrder) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  }, []);

  const handleUpdateStatus = useCallback((order: VendorOrder, newStatus: VendorOrder["status"]) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === order.id
          ? { ...item, status: newStatus, updatedAt: new Date().toISOString() }
          : item
      )
    );
  }, []);

  const rowActions: RowAction<VendorOrder>[] = useMemo(
    () => [
      {
        label: "View Details",
        icon: <Eye className="h-4 w-4" />,
        variant: "default" as const,
        onClick: handleViewOrder,
      },
      {
        label: "Update Status",
        icon: <RefreshCw className="h-4 w-4" />,
        variant: "default" as const,
        onClick: (order: VendorOrder) => {
          // This would open a status update dropdown/modal
          console.log("Update status", order);
        },
      },
      {
        label: "Cancel Order",
        icon: <XCircle className="h-4 w-4" />,
        variant: "destructive" as const,
        onClick: (order: VendorOrder) => {
          if (order.status !== "CANCELLED" && order.status !== "COMPLETED") {
            handleUpdateStatus(order, "CANCELLED");
          }
        },
      },
    ],
    [handleViewOrder, handleUpdateStatus]
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "status",
        title: "Status",
        options: orderStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "paymentStatus",
        title: "Payment",
        options: paymentStatuses.map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    []
  );

  const toolbarActions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="h-9 gap-1.5">
        <Package className="h-4 w-4" />
        <span className="hidden sm:inline">Export</span>
      </Button>
    </div>
  );

  const initialSort: InitialSort = {
    id: "orderNumber", // Changed from "createdAt" to "orderNumber"
    desc: false,
  };

  return (
    <>
      <DataTable
        columns={orderColumns}
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
      <OrderDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </>
  );
}