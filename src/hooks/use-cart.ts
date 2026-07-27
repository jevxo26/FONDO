"use client";

import { useCallback, useEffect, useState } from "react";
import * as cartStorage from "@/lib/cart-storage";
import type { Cart, CartItem } from "@/types/cart";

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
  const [cart, setCart] = useState<Cart>(() => toCart(cartStorage.getCart()));

  useEffect(() => {
    const handler = () => setCart(toCart(cartStorage.getCart()));
    window.addEventListener("fondo-cart-changed", handler);
    return () => window.removeEventListener("fondo-cart-changed", handler);
  }, []);

  return { data: cart, isLoading: false, error: null };
}

export function useAddToCart() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (args: AddToCartArgs, options?: { onSuccess?: () => void; onSettled?: () => void }) => {
      if (isPending) return;
      setIsPending(true);
      try {
        cartStorage.addItem(args.foodId, args.name, args.unitPrice, args.quantity, args.thumbnail);
        options?.onSuccess?.();
        options?.onSettled?.();
      } catch {
        options?.onSettled?.();
      } finally {
        setIsPending(false);
      }
    },
    [isPending],
  );

  const mutateAsync = useCallback(async (args: AddToCartArgs) => {
    cartStorage.addItem(args.foodId, args.name, args.unitPrice, args.quantity, args.thumbnail);
  }, []);

  return { mutate, mutateAsync, isPending };
}

export function useRemoveFromCart() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (itemId: string, options?: { onSettled?: () => void }) => {
      if (isPending) return;
      setIsPending(true);
      try {
        cartStorage.removeItem(itemId);
        options?.onSettled?.();
      } catch {
        options?.onSettled?.();
      } finally {
        setIsPending(false);
      }
    },
    [isPending],
  );

  const mutateAsync = useCallback(async (itemId: string) => {
    cartStorage.removeItem(itemId);
  }, []);

  return { mutate, mutateAsync, isPending };
}

export function useUpdateCartItem() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (args: UpdateCartArgs, options?: { onSettled?: () => void }) => {
      if (isPending) return;
      setIsPending(true);
      try {
        cartStorage.updateQuantity(args.itemId, args.quantity);
        options?.onSettled?.();
      } catch {
        options?.onSettled?.();
      } finally {
        setIsPending(false);
      }
    },
    [isPending],
  );

  const mutateAsync = useCallback(async (args: UpdateCartArgs) => {
    cartStorage.updateQuantity(args.itemId, args.quantity);
  }, []);

  return { mutate, mutateAsync, isPending };
}

export function useClearCart() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (_?: undefined, options?: { onSettled?: () => void }) => {
      if (isPending) return;
      setIsPending(true);
      try {
        cartStorage.clearCart();
        options?.onSettled?.();
      } catch {
        options?.onSettled?.();
      } finally {
        setIsPending(false);
      }
    },
    [isPending],
  );

  const mutateAsync = useCallback(async () => {
    cartStorage.clearCart();
  }, []);

  return { mutate, mutateAsync, isPending };
}
