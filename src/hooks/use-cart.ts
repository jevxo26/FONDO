import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface CartItem {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface CartTotals {
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totals: CartTotals;
  itemCount: number;
}

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => api.get<Cart>("/cart"),
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { foodId: string; quantity: number }) =>
      api.post<Cart>("/cart/items", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => api.delete(`/cart/items/${itemId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      api.patch(`/cart/items/${itemId}`, { quantity }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete("/cart"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}
