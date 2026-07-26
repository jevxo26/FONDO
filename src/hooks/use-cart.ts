"use client";

import {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useClearCartMutation,
} from "@/store/api/slices/cart-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useCart() {
  const { data, isLoading, error } = useGetCartQuery(undefined);
  return { data, isLoading, error };
}

export function useAddToCart() {
  const [trigger, { isLoading }] = useAddToCartMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRemoveFromCart() {
  const [trigger, { isLoading }] = useRemoveFromCartMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateCartItem() {
  const [trigger, { isLoading }] = useUpdateCartItemMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useClearCart() {
  const [trigger, { isLoading }] = useClearCartMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
