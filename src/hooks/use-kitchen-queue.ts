"use client";

import { toast } from "sonner";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import { useKitchenQueue } from "@/store/api/slices/kitchen-orders-api";
import { useUpdateOrderStatus } from "@/store/api/slices/orders-api";
import { handleApiError } from "@/lib/api-error";

const POLLING_INTERVAL = 15000;

export function useKitchenQueuePage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const { orders, queued, preparing, ready, isLoading, error, refetch } = useKitchenQueue(
    vendor?.id ?? "",
    POLLING_INTERVAL,
  );
  const updateStatus = useUpdateOrderStatus();

  const handleStartPrep = (orderId: string, orderNumber: string) => {
    if (updateStatus.isPending) return;
    updateStatus.mutate(
      { orderId, status: "PREPARING" },
      {
        onSuccess: () => {
          toast.success(`${orderNumber} preparation started`);
          refetch();
        },
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  const handleMarkReady = (orderId: string, orderNumber: string) => {
    if (updateStatus.isPending) return;
    updateStatus.mutate(
      { orderId, status: "READY_FOR_PICKUP" },
      {
        onSuccess: () => {
          toast.success(`${orderNumber} marked ready for pickup`);
          refetch();
        },
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return {
    vendor,
    orders,
    queued,
    preparing,
    ready,
    isLoading: vendorLoading || isLoading,
    error,
    handleStartPrep,
    handleMarkReady,
    isUpdating: updateStatus.isPending,
  };
}
