import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type {
  Order,
  OrderFeedback,
  OrderInvoice,
  OrderRefund,
  PlaceOrderPayload,
  PlaceOrderResponse,
} from "@/types/order";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Order"],
    }),

    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order" as const, id }],
    }),

    placeOrder: builder.mutation<PlaceOrderResponse, PlaceOrderPayload>({
      query: (body) => ({ url: "/cart/checkout/place-order", method: "POST", body }),
      invalidatesTags: ["Cart", "Order"],
    }),

    cancelOrder: builder.mutation<void, string>({
      query: (orderId) => ({ url: `/orders/${orderId}/cancel`, method: "POST" }),
      invalidatesTags: ["Order"],
    }),

    submitFeedback: builder.mutation<
      OrderFeedback,
      { orderId: string; rating: number; review?: string }
    >({
      query: ({ orderId, ...body }) => ({
        url: `/orders/${orderId}/feedback`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    getInvoice: builder.query<OrderInvoice, string>({
      query: (orderId) => `/orders/${orderId}/invoice`,
      providesTags: (result, error, id) => [{ type: "Order" as const, id }],
    }),

    updateOrderStatus: builder.mutation<void, { orderId: string; status: string }>({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    assignRider: builder.mutation<void, { orderId: string; riderId: string }>({
      query: ({ orderId, riderId }) => ({
        url: `/orders/${orderId}/assign-rider`,
        method: "PATCH",
        body: { riderId },
      }),
      invalidatesTags: ["Order"],
    }),

    updateMealStatus: builder.mutation<void, { mealId: string; status: string }>({
      query: ({ mealId, status }) => ({
        url: `/order-meals/${mealId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    listRefunds: builder.query<OrderRefund[], string>({
      query: (orderId) => `/orders/${orderId}/refunds`,
      providesTags: ["Order"],
    }),

    processRefund: builder.mutation<
      OrderRefund,
      { orderId: string; amount: number; refundMethod?: string; reason: string }
    >({
      query: ({ orderId, ...body }) => ({
        url: `/orders/${orderId}/refund`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  usePlaceOrderMutation,
  useCancelOrderMutation,
  useSubmitFeedbackMutation,
  useGetInvoiceQuery,
  useUpdateOrderStatusMutation,
  useAssignRiderMutation,
  useUpdateMealStatusMutation,
  useListRefundsQuery,
  useProcessRefundMutation,
} = ordersApi;

export const useOrders = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  return { data, isLoading, error };
};

export const useOrder = (id: string) => {
  const { data, isLoading, error } = useGetOrderQuery(id, { skip: !id });
  return { data, isLoading, error };
};

export const useInvoice = (orderId: string) => {
  const { data, isLoading, error } = useGetInvoiceQuery(orderId, { skip: !orderId });
  return { data, isLoading, error };
};

export function usePlaceOrder() {
  const [trigger, { isLoading }] = usePlaceOrderMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCancelOrder() {
  const [trigger, { isLoading }] = useCancelOrderMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useSubmitFeedback() {
  const [trigger, { isLoading }] = useSubmitFeedbackMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateOrderStatus() {
  const [trigger, { isLoading }] = useUpdateOrderStatusMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useAssignRider() {
  const [trigger, { isLoading }] = useAssignRiderMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateMealStatus() {
  const [trigger, { isLoading }] = useUpdateMealStatusMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useProcessRefund() {
  const [trigger, { isLoading }] = useProcessRefundMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export const useRefunds = (orderId: string) => {
  const { data, isLoading, error } = useListRefundsQuery(orderId, { skip: !orderId });
  return { data, isLoading, error };
};
