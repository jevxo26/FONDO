import React from "react";
import { ShieldCheck, PhoneCall } from "lucide-react";

export default function CheckoutSidebar() {
  return (
    <div className="w-full space-y-4">
      {/* Primary Price Computation Card */}
      <div className="bg-card border border-border/40 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="font-heading text-lg font-medium border-b border-border/20 pb-3">Subscription Architecture</h3>
        
        <div className="space-y-3 font-sans text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Signature Slim-Down base</span>
            <span className="font-medium text-foreground">৳11,400</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Bespoke Customization Fee</span>
            <span className="font-medium text-foreground">৳120</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Logistics & Shipping Eco Cells</span>
            <span className="text-success font-bold uppercase tracking-wider text-[10px]">Free Delivery</span>
          </div>
          
          <div className="border-t border-border/20 pt-4 mt-2 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground/70">Total Allocation</span>
              <span className="text-[10px] text-muted-foreground">VAT Inclusive configuration</span>
            </div>
            <span className="text-xl font-bold text-primary">৳11,520</span>
          </div>
        </div>

        <button className="w-full py-3.5 bg-primary text-primary-foreground font-sans font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition-all uppercase tracking-widest">
          Subscribe Now
        </button>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70 justify-center">
          <ShieldCheck className="size-3.5 text-success" /> Secure encrypted gateway authentication
        </div>
      </div>

      {/* Advisory Callout Block Widget */}
      <div className="bg-secondary border border-border/40 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-card flex items-center justify-center text-primary shadow-sm">
            <PhoneCall className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Unsure about macros?</h4>
            <p className="text-[10px] text-muted-foreground/70">Talk to our heritage concierge advisors</p>
          </div>
        </div>
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/80 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
      </div>
    </div>
  );
}