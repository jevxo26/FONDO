import React from "react";
import { ShieldCheck, PhoneCall } from "lucide-react";

export default function CheckoutSidebar() {
  return (
    <div className="w-full space-y-4">
      {/* Primary Price Computation Card */}
      <div className="bg-white border border-[#d7c3b2]/30 rounded-[2rem] p-6 shadow-sm space-y-6">
        <h3 className="font-serif text-lg font-medium border-b border-[#d7c3b2]/20 pb-3">Subscription Architecture</h3>
        
        <div className="space-y-3 font-sans text-xs">
          <div className="flex justify-between text-[#524437]">
            <span>Signature Slim-Down base</span>
            <span className="font-medium text-[#1e1b17]">৳11,400</span>
          </div>
          <div className="flex justify-between text-[#524437]">
            <span>Bespoke Customization Fee</span>
            <span className="font-medium text-[#1e1b17]">৳120</span>
          </div>
          <div className="flex justify-between text-[#524437]">
            <span>Logistics & Shipping Eco Cells</span>
            <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">Free Delivery</span>
          </div>
          
          <div className="border-t border-[#d7c3b2]/20 pt-4 mt-2 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#524437]/70">Total Allocation</span>
              <span className="text-[10px] text-muted-foreground">VAT Inclusive configuration</span>
            </div>
            <span className="text-xl font-bold text-[#885200]">৳11,520</span>
          </div>
        </div>

        <button className="w-full py-3.5 bg-[#885200] text-white font-sans font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition-all uppercase tracking-widest">
          Subscribe Now
        </button>

        <div className="flex items-center gap-2 text-[10px] text-[#524437]/70 justify-center">
          <ShieldCheck className="size-3.5 text-emerald-600" /> Secure encrypted gateway authentication
        </div>
      </div>

      {/* Advisory Callout Block Widget */}
      <div className="bg-[#f4ece6]/60 border border-[#d7c3b2]/30 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-white flex items-center justify-center text-[#885200] shadow-sm">
            <PhoneCall className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Unsure about macros?</h4>
            <p className="text-[10px] text-[#524437]/70">Talk to our heritage concierge advisors</p>
          </div>
        </div>
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
    </div>
  );
}