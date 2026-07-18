"use client";

import Link from "next/link";
import { CartItemCard } from "@/components/carts/cart-item-card";
import { OrderSummary } from "@/components/carts/order-summary";
import { useCart, useRemoveFromCart, useUpdateCartItem, useClearCart } from "@/hooks/use-cart";
import { handleApiError } from "@/lib/api-error";
import type { CartItem as CartItemType } from "@/types/cart";
import { Loader2 } from "lucide-react";

export default function CartPageView() {
  const { data: cart, isLoading, error } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();
  const clearCart = useClearCart();

  if (isLoading) {
    return (
      <main className="flex-1 py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 py-12">
        <div className="wrapper">
          <div className="py-16 text-center border border-dashed border-border rounded-[32px] bg-white dark:bg-card">
            <p className="font-sans text-sm text-red-600">{handleApiError(error)}</p>
            <Link
              href="/menu"
              className="mt-4 inline-flex h-10 items-center rounded-xl bg-primary px-5 font-sans text-xs font-semibold text-primary-foreground"
            >
              Return to Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const items: CartItemType[] = (cart?.items ?? []).map((item) => ({
    id: item.id,
    title: item.food?.name ?? "Item",
    price: item.unitPrice,
    quantity: item.quantity,
    thumbnail: item.food?.thumbnail ?? "",
    itemsSold: 0,
  }));

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalValue = cart?.subtotal ?? 0;
  const deliveryCost = cart?.deliveryCharge ?? 0;

  const handleUpdateQuantity = (id: string, newQty: number) => {
    updateItem.mutate({ itemId: id, quantity: newQty });
  };

  const handleRemoveItem = (id: string) => {
    removeItem.mutate(id);
  };

  return (
    <main className="flex-1 py-12">
      <div className="wrapper">
        <div className="mb-8">
          <h1 className="font-fraunces text-4xl font-normal text-secondary-foreground tracking-tight">
            Your Cart
          </h1>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="flex flex-col gap-4 lg:col-span-8">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <OrderSummary
                subtotal={subtotalValue}
                savings={0}
                deliveryCharges={deliveryCost || "free"}
              />

              <Link
                href="/menu"
                className="mt-4 flex w-full h-11 items-center justify-center rounded-full bg-white border border-border font-sans text-xs font-semibold text-secondary-foreground transition-colors hover:bg-muted"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-border rounded-[32px] bg-white dark:bg-card">
            <p className="font-sans text-sm text-muted-foreground">Your active cart is empty.</p>
            <Link
              href="/menu"
              className="mt-4 inline-flex h-10 items-center rounded-xl bg-primary px-5 font-sans text-xs font-semibold text-primary-foreground"
            >
              Return to Menu
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
