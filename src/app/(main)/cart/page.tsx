"use client";

import { useState } from "react";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import { mockCartItems } from "@/data/cart-items";
import { CartItemCard } from "@/components/carts/cart-item-card";
import { OrderSummary } from "@/components/carts/order-summary";

export default function CartPageView() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  // Updates row numbers and handles reactive totals
  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)),
    );
  };

  // Line element evacuation handler
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Structural aggregates calculated programmatically
  const subtotalValue = cartItems.reduce(
    (acc, item) => acc + (item.oldPrice || item.price) * item.quantity,
    0,
  );
  const totalCurrentValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = subtotalValue - totalCurrentValue;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="flex-1 py-12">
      <div className="wrapper">
        {/* Main Context Headline Header */}
        <div className="mb-8">
          <h1 className="font-fraunces text-4xl font-normal text-secondary-foreground tracking-tight">
            Your Cart
          </h1>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Dual Multi-Column Workspace Segment */}
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Row Loop Stream Column */}
            <div className="flex flex-col gap-4 lg:col-span-8">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Right Side Sticky Aggregate Interface Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <OrderSummary
                subtotal={subtotalValue}
                savings={totalSavings}
                deliveryCharges="free"
              />

              {/* Secondary navigation hook to go back to shop */}
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
              className="mt-4 inline-flex h-10 items-center rounded-xl bg-[#CEA359] px-5 font-sans text-xs font-semibold text-[#1B0E08]"
            >
              Return to Menu
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
