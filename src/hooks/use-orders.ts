"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Order, OrderListResponse, PlaceOrderPayload, PlaceOrderResponse } from "@/types/order";

export function useOrders(page = 1, limit = 10) {
  return useQuery({
    queryKey: queryKeys.orders.list(page, limit),
    queryFn: () =>
      api.get<OrderListResponse>(`/orders?page=${page}&limit=${limit}`),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => api.get<Order>(`/orders/${id}`),
    enabled: !!id,
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => api.post(`/orders/${orderId}/cancel`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.orders.all }),
  });
}

export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PlaceOrderPayload) =>
      api.post<PlaceOrderResponse>("/cart/checkout/place-order", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
      qc.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}
