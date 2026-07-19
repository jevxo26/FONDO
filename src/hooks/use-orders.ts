import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface OrderFood {
  id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  foodCode: string;
}

export interface OrderItem {
  id: string;
  foodId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  food: OrderFood;
}

export interface OrderTimeline {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  createdAt: string;
}

export interface OrderRider {
  id: string;
  fullName: string;
  phone: string;
}

export interface OrderDelivery {
  id: string;
  deliveryStatus: string;
  estimatedDeliveryTime: string | null;
  rider: OrderRider | null;
}

export interface OrderPayment {
  id: string;
  amount: number;
  status: string;
}

export interface OrderCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderStatus: string;
  deliveryStatus: string;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  vat: number;
  totalAmount: number;
  notes: string | null;
  placedAt: string;
  items: OrderItem[];
  timeline: OrderTimeline[];
  delivery: OrderDelivery | null;
  payment: OrderPayment | null;
  customer: OrderCustomer;
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

export interface PlaceOrderPayload {
  cartId: string;
  addressId: string;
  paymentMethodId: string;
  notes?: string;
}

export interface PlaceOrderResponse {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
}

export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PlaceOrderPayload) =>
      api.post<PlaceOrderResponse>("/cart/checkout/place-order", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
