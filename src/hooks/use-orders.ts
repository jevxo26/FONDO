import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface OrderItem {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export interface OrderListResponse {
  items: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useOrders(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () =>
      api.get<OrderListResponse>(`/orders?page=${page}&limit=${limit}`),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => api.get<Order>(`/orders/${id}`),
    enabled: !!id,
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => api.post(`/orders/${orderId}/cancel`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
