"use client";

import { useOrders } from "@/hooks/use-orders";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export function OrderHistory() {
  const { data: ordersRes, isLoading } = useOrders();

  if (isLoading) {
    return <p className="text-xs text-muted-foreground">Loading orders...</p>;
  }

  const orders = ordersRes ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-foreground">Order History</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Recent orders and their status.</p>
      </div>
      {orders.length === 0 ? (
        <p className="text-xs text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <Link
              key={order.id}
              href={`/track-order?orderId=${order.id}`}
              className="block p-4 border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-sans text-xs font-bold text-foreground">{order.orderNumber}</h4>
                  <p className="font-sans text-[10px] text-muted-foreground mt-0.5">{new Date(order.placedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="font-fraunces text-sm font-bold text-foreground">৳{order.totalAmount}</span>
                  <span className="block text-[9px] uppercase tracking-wider mt-0.5 px-2 py-0.5 bg-primary/10 text-primary font-bold rounded-md">{order.orderStatus}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {ordersRes && ordersRes.length > 10 && (
        <p className="text-[10px] text-muted-foreground text-center">
          Showing recent {ordersRes.length} orders
        </p>
      )}
    </div>
  );
}

export function WalletBalance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-foreground">Wallet</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Store credits and gift vouchers for faster checkout.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-foreground text-background p-5 rounded-2xl space-y-4 shadow-sm relative overflow-hidden">
          <span className="text-[9px] text-background/50 uppercase tracking-widest block">Available Balance</span>
          <h2 className="font-fraunces text-2xl font-bold">৳2,450.00</h2>
          <button type="button" className="w-full py-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors">
            Top Up
          </button>
        </div>
        <div className="md:col-span-2 border border-border rounded-2xl p-4 space-y-3 bg-card">
          <h4 className="font-fraunces text-xs font-bold text-foreground">Quick Top Up</h4>
          <div className="flex gap-2 pt-1">
            {["+ ৳500", "+ ৳1,000", "+ ৳2,000"].map(amt => (
              <button key={amt} type="button" className="px-3 py-1.5 bg-muted border border-border text-foreground rounded-lg text-[10px] font-bold hover:bg-muted/80 transition-colors">{amt}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
