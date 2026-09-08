"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table";
import { vendorOrderColumns } from "./vendor-order-columns";
import { OrderDetailModal } from "./order-detail-modal";
import { Eye, RefreshCw, XCircle } from "lucide-react";
import { orderStatuses, paymentStatuses } from "@/data/vendor-orders";
import type { VendorOrderListItem } from "@/store/api/slices/vendor-orders-api";
import type { RowAction, FacetedFilter, InitialSort } from "@/components/common/table/types";

interface VendorOrderTableSectionProps {
  orders: VendorOrderListItem[];
  isLoading?: boolean;
  onUpdateStatus: (orderId: string, status: string) => void;
  updateStatusPending?: boolean;
}

export function VendorOrderTableSection({
  orders,
  isLoading,
  onUpdateStatus,
  updateStatusPending,
}: VendorOrderTableSectionProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<VendorOrderListItem | null>(null);

  const handleViewOrder = useCallback((order: VendorOrderListItem) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  }, []);

  const getNextStatus = (currentStatus: string): string | null => {
    const flow: Record<string, string> = {
      PENDING: "CONFIRMED",
      CONFIRMED: "PREPARING",
      PREPARING: "READY_FOR_PICKUP",
    };
    return flow[currentStatus] ?? null;
  };

  const rowActions: RowAction<VendorOrderListItem>[] = useMemo(
    () => [
      {
        label: "View Details",
        icon: <Eye className="h-4 w-4" />,
        variant: "default" as const,
        onClick: handleViewOrder,
      },
      ...(orders.some((o) => getNextStatus(o.orderStatus))
        ? [
            {
              label: "Update Status",
              icon: <RefreshCw className="h-4 w-4" />,
              variant: "default" as const,
              onClick: (order: VendorOrderListItem) => {
                const next = getNextStatus(order.orderStatus);
                if (next) onUpdateStatus(order.id, next);
              },
            },
          ]
        : []),
      {
        label: "Cancel Order",
        icon: <XCircle className="h-4 w-4" />,
        variant: "destructive" as const,
        onClick: (order: VendorOrderListItem) => {
          if (order.orderStatus !== "CANCELLED" && order.orderStatus !== "COMPLETED") {
            onUpdateStatus(order.id, "CANCELLED");
          }
        },
      },
    ],
    [handleViewOrder, onUpdateStatus, orders],
  );

  const facetedFilters: FacetedFilter[] = useMemo(
    () => [
      {
        columnId: "orderStatus",
        title: "Status",
        options: orderStatuses.filter((s) => s.value !== "ALL").map((s) => ({ label: s.label, value: s.value })),
      },
      {
        columnId: "paymentStatus",
        title: "Payment",
        options: paymentStatuses.filter((s) => s.value !== "ALL").map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    [],
  );

  const initialSort: InitialSort = { id: "placedAt", desc: true };

  return (
    <>
      <DataTable
        columns={vendorOrderColumns}
        data={orders}
        isLoading={isLoading}
        pageSize={10}
        enableSorting
        rowActions={rowActions}
        filters={facetedFilters}
        enableSearch
        enableColumnToggle
        initialSort={initialSort}
      />
      <OrderDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        order={selectedOrder}
        onUpdateStatus={onUpdateStatus}
        updateStatusPending={updateStatusPending}
      />
    </>
  );
}
