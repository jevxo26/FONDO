"use client";

import { toast } from "sonner";
import { useMyVendor, useVendorOrders } from "@/store/api/slices/vendor-orders-api";
import { useUpdateOrderStatus } from "@/store/api/slices/orders-api";
import { handleApiError } from "@/lib/api-error";

export function useVendorOrdersPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const { data: orders, isLoading, error, refetch } = useVendorOrders(vendor?.id ?? "");
  const updateStatus = useUpdateOrderStatus();

  const handleUpdateStatus = (orderId: string, status: string) => {
    if (updateStatus.isPending) return;
    updateStatus.mutate(
      { orderId, status },
      {
        onSuccess: () => {
          toast.success(`Order status updated to ${status.replace(/_/g, " ").toLowerCase()}`);
          refetch();
        },
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return {
    vendor,
    orders,
    isLoading: vendorLoading || isLoading,
    error,
    handleUpdateStatus,
    updateStatusPending: updateStatus.isPending,
    refetch,
  };
}
