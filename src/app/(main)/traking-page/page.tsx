"use client";

import { Check, Truck, Phone, MapPin, Smartphone, CreditCard } from "lucide-react";
import { milestones, mockTrackingData } from "@/data/traking";

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="wrapper max-w-6xl">
        
        {/* 1. MAIN METADATA HEADER */}
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold text-foreground mb-2">Cooking now</h1>
          <div className="font-sans text-sm text-muted-foreground space-y-0.5">
            <p>Order number: {mockTrackingData.orderNumber}</p>
            <p>Estimated arrival in {mockTrackingData.eta}. {mockTrackingData.itemsSummary}</p>
          </div>
        </div>

        {/* TWO COLUMN CONTENT SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT AREA CONTAINER (65% Width Block) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* ETA ALERT HERO BANNER */}
            <div className="bg-primary rounded-2xl p-5 text-white shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-11 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Truck className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-semibold">Your product is on its way!</h3>
                  <p className="font-sans text-xs text-white/90">Estimated delivery: Today, 02:00 PM - 06:00 PM</p>
                </div>
              </div>
              <span className="self-start sm:self-center bg-black rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-wide uppercase">
                On delivery
              </span>
            </div>

            {/* VERTICAL TIMELINE CARD */}
            <div className="bg-card border border-border/40 rounded-[32px] p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <h2 className="font-sans text-lg font-bold text-foreground mb-6">Delivery status</h2>
              
              <div className="relative pl-2">
                {milestones.map((step, index) => {
                  const isLast = index === milestones.length - 1;
                  
                  return (
                    <div key={step.id} className="relative flex gap-5 pb-8 group last:pb-0">
                      
                      {/* Vertical Tracker Connector Line */}
                      {!isLast && (
                        <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-[#E5DFD5]" />
                      )}

                      {/* Status Node Variants Mapping */}
                      <div className="relative z-10 shrink-0">
                        {step.status === "completed" && (
                          <div className="size-8 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                            <Check className="size-4 text-primary stroke-[3]" />
                          </div>
                        )}
                        {step.status === "current" && (
                          <div className="size-8 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                            <div className="size-3 rounded-full bg-primary" />
                          </div>
                        )}
                        {step.status === "pending" && (
                          <div className="size-8 rounded-full border-2 border-[#DDD6CF] bg-card flex items-center justify-center">
                            <div className="size-2 rounded-full bg-[#9C968E]" />
                          </div>
                        )}
                      </div>

                      {/* Content Typography Texts */}
                      <div className="flex flex-col pt-0.5 font-sans">
                        <h4 className={`text-sm font-bold ${
                          step.status === "current" ? "text-primary" : "text-foreground"
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                        {step.time && (
                          <span className="text-[11px] text-muted-foreground/80 mt-1">
                            🕒 {step.time}
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIDER PROFILE CONTROL BANNER */}
            <div className="bg-card border border-border/40 rounded-[32px] p-5 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-14 bg-[#EBDCB9] rounded-full flex items-center justify-center font-sans text-2xl font-bold text-[#8A6A32] shrink-0">
                  R
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-foreground">{mockTrackingData.rider.name}</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">{mockTrackingData.rider.status}</p>
                </div>
              </div>
              <button className="h-11 px-6 rounded-full bg-[#16100C] text-white font-sans text-xs font-semibold hover:bg-[#2C241E] transition-colors flex items-center gap-2 shadow-sm">
                <Phone className="size-3.5 fill-current" />
                Call
              </button>
            </div>

          </div>

          {/* RIGHT AREA SIDEBAR (35% Width Block) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-6">
            
            {/* DELIVERY INFORMATION DETAILS BOX */}
            <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-[var(--shadow-card)] font-sans">
              <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-3 mb-4">
                Delivery Information
              </h3>
              
              <div className="space-y-4">
                {/* Destination Node */}
                <div className="flex gap-3 items-start">
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-foreground mb-0.5">Delivery address</p>
                    <p className="text-muted-foreground font-medium">{mockTrackingData.deliveryAddress.name}</p>
                    <p className="text-muted-foreground">{mockTrackingData.deliveryAddress.street}</p>
                    <p className="text-muted-foreground">{mockTrackingData.deliveryAddress.area}</p>
                    <p className="text-muted-foreground">{mockTrackingData.deliveryAddress.country}</p>
                  </div>
                </div>

                {/* Comms Link Node */}
                <div className="flex gap-3 items-center pt-2 border-t border-dashed border-border/40">
                  <Smartphone className="size-4 text-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">communication</p>
                    <p className="text-muted-foreground mt-0.5">{mockTrackingData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT CALCULATION PRICE MATRIX */}
            <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-[var(--shadow-card)] font-sans">
              <h3 className="text-sm font-bold text-foreground pb-3 mb-3">
                Payment Summary
              </h3>
              
              <div className="space-y-3 border-b border-border/60 pb-4 mb-4 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">৳{mockTrackingData.financials.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery charges</span>
                  <span className="font-medium text-foreground">৳{mockTrackingData.financials.deliveryCharges}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">৳{mockTrackingData.financials.total.toLocaleString()}</span>
              </div>

              {/* Verified Method Pill Label */}
              <div className="flex items-center gap-2 bg-muted rounded-xl p-3 border border-border/20 text-xs">
                <CreditCard className="size-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Payment Method: <strong className="text-foreground font-semibold">{mockTrackingData.financials.method}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}