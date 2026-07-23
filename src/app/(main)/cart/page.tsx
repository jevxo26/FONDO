"use client";

import { CartItemCard } from "@/components/carts/cart-item-card";
import { OrderSummary } from "@/components/carts/order-summary";
import { SectionReveal } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import { useCart, useClearCart, useRemoveFromCart, useUpdateCartItem } from "@/hooks/use-cart";
import { handleApiError } from "@/lib/api-error";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPageView() {
  const { data: cart, isLoading, error } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();
  const clearCart = useClearCart();

  const [qtyUpdatingIds, setQtyUpdatingIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) {
      setDeletingIds((prev) => new Set(prev).add(id));
      removeItem.mutate(id, {
        onSettled: () =>
          setDeletingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          }),
      });
      return;
    }
    setQtyUpdatingIds((prev) => new Set(prev).add(id));
    updateItem.mutate(
      { itemId: id, quantity: newQty },
      {
        onSettled: () =>
          setQtyUpdatingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          }),
      },
    );
  };

  const handleRemoveItem = (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    removeItem.mutate(id, {
      onSettled: () =>
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        }),
    });
  };

  if (isLoading && !cart) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper">
          <div className="py-16 text-center border border-dashed border-border rounded-3xl bg-card">
            <p className="font-sans text-sm text-red-600">{handleApiError(error)}</p>
            <Link href="/foods">
              <Button variant="default" className="mt-4 rounded-xl">
                Return to Menu
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const items: CartItemType[] = cart?.items ?? [];

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalValue = Number(cart?.subtotal ?? 0);
  const deliveryCost = Number(cart?.deliveryCharge ?? 0);

  return (
    <main className="flex-1 py-8 lg:py-12">
      <div className="wrapper">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl font-normal text-secondary-foreground tracking-tight">
              Your Cart
            </h1>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearCart.mutate()}
              disabled={clearCart.isPending}
              className="gap-2 rounded-full text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="size-3.5" />
              Clear all
            </Button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <SectionReveal className="flex flex-col gap-4 lg:col-span-8">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  isQtyUpdating={qtyUpdatingIds.has(item.id)}
                  isDeleting={deletingIds.has(item.id)}
                />
              ))}
            </SectionReveal>

            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <OrderSummary
                subtotal={subtotalValue}
                savings={0}
                deliveryCharges={deliveryCost || "free"}
              />

              <Link href="/foods">
                <Button variant="outline" className="mt-4 w-full h-11 rounded-full">
                  Continue shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-border rounded-3xl bg-card">
            <ShoppingCart className="size-8 mx-auto mb-3 text-muted-foreground" />
            <p className="font-sans text-sm text-muted-foreground">Your active cart is empty.</p>
            <Link href="/foods">
              <Button variant="default" className="mt-4 rounded-xl">
                Return to Menu
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
