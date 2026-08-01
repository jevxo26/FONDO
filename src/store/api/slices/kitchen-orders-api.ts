import { api } from "../base-api";
import type { VendorOrderListItem } from "./vendor-orders-api";
import type { KitchenOrderStatus, MealType } from "@/data/kitchen";

export interface KitchenOrderAdapter {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  status: KitchenOrderStatus;
  mealType: MealType;
  priority: number;
  notes: string | null;
  placedAt: string;
  estimatedReadyAt: string;
  items: Array<{ id: string; name: string; quantity: number; status: KitchenOrderStatus }>;
}

export function adaptToKitchenOrder(o: VendorOrderListItem): KitchenOrderAdapter {
  const statusMap: Record<string, KitchenOrderStatus> = {
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
    mealType: "LUNCH",
    priority: 0,
    status: statusMap[o.orderStatus] ?? "QUEUED",
    items: o.items.map((i) => ({
      id: i.id,
      name: i.food?.name ?? "Unknown item",
      quantity: i.quantity,
      status: "QUEUED",
    })),
    placedAt: o.placedAt,
    notes: o.notes,
    estimatedReadyAt: "",
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
