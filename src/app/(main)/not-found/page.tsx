"use client";

import { useState } from "react";
import Link from "next/link";

export default function OrderNotFound() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tracking order number:", orderNumber);
    // Execute data re-validation query loop here
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="wrapper">
        {/* TOP PANEL: Section Headline + Integrated Input Search Bar Grid */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="font-heading text-4xl font-normal text-secondary-foreground tracking-tight">
              Track Your Order
            </h1>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Real-time updates on your shipment progress
            </p>
          </div>

          {/* Search Input Box Element */}
          <form
            onSubmit={handleTrack}
            className="flex items-center w-full md:w-auto max-w-md gap-0 relative"
          >
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter order number..."
              className="h-11 w-full md:w-72 rounded-l-xl border border-border bg-card px-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-r-xl bg-primary text-card font-sans text-xs font-semibold hover:bg-[#bfa052] transition-colors whitespace-nowrap"
            >
              Track
            </button>
          </form>
        </div>

        {/* CENTER BOX: NOT FOUND CONTENT BLOCK */}
        <div className="max-w-[570px] mx-auto bg-card rounded-[32px] border border-border/40 py-16 px-8 text-center shadow-[var(--shadow-card)] flex flex-col items-center justify-center">
          {/* Missing Package Emoji Module Wrapper */}
          <span className="text-4xl block mb-5 select-none" role="img" aria-label="Cardboard Box">
            📦
          </span>

          {/* Focus Typography Messages */}
          <h2 className="font-sans text-lg font-bold text-secondary-foreground tracking-tight mb-2">
            Order Not Found
          </h2>

          <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed mb-8">
            We couldn&apos;t find an order with that number. Please double-check and try again.
          </p>

          {/* Redirect CTA Navigation Action Button */}
          <Link
            href="/foods"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-sans text-xs font-semibold text-card transition-colors hover:bg-[#bfa052] shadow-sm"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
