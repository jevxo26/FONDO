"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as cartStorage from "@/lib/cart-storage";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useClearCartMutation,
} from "@/store/api/slices/cart-api";
import type { Cart, CartItem } from "@/types/cart";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";

export interface AddToCartArgs {
  foodId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  thumbnail?: string;
}

export interface UpdateCartArgs {
  itemId: string;
  quantity: number;
}

function toCartItem(s: cartStorage.StoredCartItem): CartItem {
  return {
    id: s.id,
    foodId: s.foodId,
    quantity: s.quantity,
    unitPrice: s.unitPrice,
    totalPrice: s.totalPrice,
    food: { id: s.foodId, name: s.name, thumbnail: s.thumbnail ?? null },
    addons: s.addons?.map((a) => ({
      id: a.addonItemId,
      cartItemId: s.id,
      addonItemId: a.addonItemId,
      name: a.name,
      quantity: a.quantity,
      price: a.price,
    })),
    packageMealId: s.packageMealId,
  };
}

function toCart(totals: cartStorage.CartTotals): Cart {
  return {
    id: "local",
    items: totals.items.map(toCartItem),
    subtotal: totals.subtotal,
    deliveryCharge: totals.deliveryCharge,
    discount: totals.discount,
    vat: totals.vat,
    totalAmount: totals.totalAmount,
  };
}

export function useCart() {
  const [local, setLocal] = useState<Cart>(() => toCart(cartStorage.getCart()));
  const { data: apiCart, isLoading, error } = useGetCartQuery();
  const prevApi = useRef(apiCart);

  useEffect(() => {
    const handler = () => setLocal(toCart(cartStorage.getCart()));
    window.addEventListener("fondo-cart-changed", handler);
    return () => window.removeEventListener("fondo-cart-changed", handler);
  }, []);

  useEffect(() => {
    if (apiCart && apiCart !== prevApi.current) {
      prevApi.current = apiCart;
      cartStorage.saveCart(apiCart);
    }
  }, [apiCart]);

  return { data: apiCart ?? local, isLoading, error };
}

export function useAddToCart() {
  const [trigger, { isLoading }] = useAddToCartMutation();

  const mutate = useCallback(
    (
      args: AddToCartArgs,
      options?: { onSuccess?: () => void; onError?: (e: unknown) => void; onSettled?: () => void },
    ) => {
      if (isLoading) return;
      cartStorage.addItem(args.foodId, args.name, args.unitPrice, args.quantity, args.thumbnail);
      trigger({ foodId: args.foodId, quantity: args.quantity, unitPrice: args.unitPrice })
        .unwrap()
        .then(() => {
          toast.success("Added to cart");
          options?.onSuccess?.();
        })
        .catch((err) => {
          toast.error(handleApiError(err));
          options?.onError?.(err);
        })
        .finally(() => options?.onSettled?.());
    },
    [trigger, isLoading],
  );

  const mutateAsync = useCallback(
    async (args: AddToCartArgs) => {
      cartStorage.addItem(args.foodId, args.name, args.unitPrice, args.quantity, args.thumbnail);
      return trigger({
        foodId: args.foodId,
        quantity: args.quantity,
        unitPrice: args.unitPrice,
      }).unwrap();
    },
    [trigger],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}

export function useRemoveFromCart() {
  const [trigger, { isLoading }] = useRemoveFromCartMutation();

  const mutate = useCallback(
    (itemId: string, options?: { onSettled?: () => void }) => {
      if (isLoading) return;
      cartStorage.removeItem(itemId);
      trigger(itemId)
        .unwrap()
        .then(() => toast.success("Item removed"))
        .catch((err) => toast.error(handleApiError(err)))
        .finally(() => options?.onSettled?.());
    },
    [trigger, isLoading],
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
      if (isLoading) return;
      cartStorage.updateQuantity(args.itemId, args.quantity);
      trigger({ itemId: args.itemId, quantity: args.quantity })
        .unwrap()
        .catch((err) => toast.error(handleApiError(err)))
        .finally(() => options?.onSettled?.());
    },
    [trigger, isLoading],
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
      if (isLoading) return;
      cartStorage.clearCart();
      trigger()
        .unwrap()
        .catch((err) => toast.error(handleApiError(err)))
        .finally(() => options?.onSettled?.());
    },
    [trigger, isLoading],
  );

  const mutateAsync = useCallback(async () => {
    return trigger().unwrap();
  }, [trigger]);

  return { mutate, mutateAsync, isPending: isLoading };
}
