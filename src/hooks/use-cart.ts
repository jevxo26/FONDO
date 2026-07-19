"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCartData, clearCartData } from "@/store/slices/cartDataSlice";
import { incrementCartCount } from "@/store/slices/counterSlice";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";

export interface CartItemFood {
  id: string;
  name: string;
  thumbnail: string | null;
}

export interface CartItemFood {
  id: string;
  name: string;
  thumbnail: string | null;
}

export interface CartItem {
  id: string;
  foodId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  food: CartItemFood;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
}

export function useCart() {
  const dispatch = useAppDispatch();
  const reduxCart = useAppSelector((s) => s.cartData.cart);

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: () => api.get<Cart>("/cart"),
    staleTime: 30_000,
    gcTime: 60_000,
  });

  useEffect(() => {
    if (query.data) dispatch(setCartData(query.data));
  }, [query.data, dispatch]);

  return {
    ...query,
    data: reduxCart ?? query.data,
  };
}

export function useAddToCart() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (data: { foodId: string; quantity: number; unitPrice: number }) =>
      api.post<Cart>("/cart/items", data),
    onSuccess: (data, variables) => {
      dispatch(incrementCartCount(variables.quantity));
      dispatch(setCartData(data));
      toast.success("Added to cart");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}

export function useRemoveFromCart() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (itemId: string) => api.delete<Cart>(`/cart/items/${itemId}`),
    onSuccess: (data) => {
      dispatch(setCartData(data));
      toast.success("Item removed");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}

export function useUpdateCartItem() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      api.patch<Cart>(`/cart/items/${itemId}`, { quantity }),
    onSuccess: (data) => {
      dispatch(setCartData(data));
      toast.success("Quantity updated");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}

export function useClearCart() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: () => api.delete("/cart"),
    onSuccess: () => {
      dispatch(clearCartData());
      toast.success("Cart cleared");
    },
    onError: (error) => toast.error(handleApiError(error)),
  });
}
