import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { VendorOrderListItem } from "./vendor-orders-api";

export interface KitchenOrderAdapter {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  status: "QUEUED" | "PREPARING" | "READY";
  items: Array<{ id: string; name: string; quantity: number; status: string }>;
  placedAt: string;
  notes: string | null;
}

export function adaptToKitchenOrder(o: VendorOrderListItem): KitchenOrderAdapter {
  const statusMap: Record<string, KitchenOrderAdapter["status"]> = {
    PENDING: "QUEUED",
    CONFIRMED: "QUEUED",
    PREPARING: "PREPARING",
    READY_FOR_PICKUP: "READY",
    PICKED_UP: "READY",
    ON_THE_WAY: "READY",
    DELIVERED: "READY",
    COMPLETED: "READY",
  };

  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: `${o.customer.firstName} ${o.customer.lastName}`.trim(),
    customerPhone: "",
    status: statusMap[o.orderStatus] ?? "QUEUED",
    items: o.items.map((i) => ({
      id: i.id,
      name: i.food?.name ?? "Unknown item",
      quantity: i.quantity,
      status: "QUEUED",
    })),
    placedAt: o.placedAt,
    notes: o.notes,
  };
}

export const kitchenOrdersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getKitchenQueue: builder.query<VendorOrderListItem[], string>({
      query: (vendorId) => `/vendors/${vendorId}/orders`,
      providesTags: ["KitchenOrder"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetKitchenQueueQuery } = kitchenOrdersApi;

export const useKitchenQueue = (vendorId: string, pollingInterval = 0) => {
  const { data, isLoading, error, refetch } = useGetKitchenQueueQuery(vendorId, {
    skip: !vendorId,
    pollingInterval: pollingInterval > 0 ? pollingInterval : undefined,
  });

  const orders = (data ?? []).map(adaptToKitchenOrder);
  const queued = orders.filter((o) => o.status === "QUEUED");
  const preparing = orders.filter((o) => o.status === "PREPARING");
  const ready = orders.filter((o) => o.status === "READY");

  return { orders, queued, preparing, ready, isLoading, error, refetch };
};
