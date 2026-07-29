"use client";

import { useCallback } from "react";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useClearCartMutation,
} from "@/store/api/slices/cart-api";
export interface AddToCartArgs {
  foodId: string;
  quantity: number;
  unitPrice: number;
  name?: string;
  thumbnail?: string | null;
}

export interface UpdateCartArgs {
  itemId: string;
  quantity: number;
}

export function useCart() {
  return useGetCartQuery();
}

export function useAddToCart() {
  const [trigger, { isLoading }] = useAddToCartMutation();

  const mutate = useCallback(
    (
      args: AddToCartArgs,
      options?: { onSuccess?: () => void; onError?: (e: unknown) => void; onSettled?: () => void },
    ) => {
      trigger({ foodId: args.foodId, quantity: args.quantity, unitPrice: args.unitPrice, name: args.name, thumbnail: args.thumbnail })
        .unwrap()
        .then(() => options?.onSuccess?.())
        .catch((err) => options?.onError?.(err))
        .finally(() => options?.onSettled?.());
    },
    [trigger],
  );

  const mutateAsync = useCallback(
    async (args: AddToCartArgs) => {
      return trigger({ foodId: args.foodId, quantity: args.quantity, unitPrice: args.unitPrice, name: args.name, thumbnail: args.thumbnail }).unwrap();
    },
    [trigger],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}

export function useRemoveFromCart() {
  const [trigger, { isLoading }] = useRemoveFromCartMutation();

  const mutate = useCallback(
    (itemId: string, options?: { onSettled?: () => void }) => {
      trigger(itemId)
        .unwrap()
        .finally(() => options?.onSettled?.());
    },
    [trigger],
  );

  const mutateAsync = useCallback(
    async (itemId: string) => {
      return trigger(itemId).unwrap();
    },
    [trigger],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}

export function useUpdateCartItem() {
  const [trigger, { isLoading }] = useUpdateCartItemMutation();

  const mutate = useCallback(
    (args: UpdateCartArgs, options?: { onSettled?: () => void }) => {
      trigger({ itemId: args.itemId, quantity: args.quantity })
        .unwrap()
        .finally(() => options?.onSettled?.());
    },
    [trigger],
  );

  const mutateAsync = useCallback(
    async (args: UpdateCartArgs) => {
      return trigger({ itemId: args.itemId, quantity: args.quantity }).unwrap();
    },
    [trigger],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}

export function useClearCart() {
  const [trigger, { isLoading }] = useClearCartMutation();

  const mutate = useCallback(
    (_?: undefined, options?: { onSettled?: () => void }) => {
      trigger()
        .unwrap()
        .finally(() => options?.onSettled?.());
    },
    [trigger],
  );

  const mutateAsync = useCallback(async () => {
    return trigger().unwrap();
  }, [trigger]);

  return { mutate, mutateAsync, isPending: isLoading };
}
