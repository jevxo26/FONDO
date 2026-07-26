import { api } from "../base-api";
import type { Order, PlaceOrderPayload, PlaceOrderResponse } from "@/types/order";

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
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  usePlaceOrderMutation,
  useCancelOrderMutation,
} = ordersApi;
