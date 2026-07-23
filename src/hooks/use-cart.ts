"use client";

import { api } from "@/lib/api-client";
import { handleApiError } from "@/lib/api-error";
import type { Cart } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: () => api.get<Cart>("/cart"),
    staleTime: 30_000,
    gcTime: 60_000,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { foodId: string; quantity: number; unitPrice: number }) =>
      api.post<Cart>("/cart/items", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success("Added to cart");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}

export function useRemoveFromCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => api.delete<Cart>(`/cart/items/${itemId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success("Item removed");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      api.patch<Cart>(`/cart/items/${itemId}`, { quantity }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success("Quantity updated");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete("/cart"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success("Cart cleared");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}
