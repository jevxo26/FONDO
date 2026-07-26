import React from "react";
import { Bike } from "lucide-react";

export function FormVehicleDetails({ onFocus }: { onFocus: () => void }) {
  return (
    <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={onFocus}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">05</span>
          <h3 className="font-heading text-xl font-bold text-foreground">Vehicle Details</h3>
        </div>
        <Bike className="size-5 text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Vehicle Type *</label>
          <select className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="bike">Motorbike</option>
            <option value="scooter">Electric Scooter</option>
            <option value="cycle">Bicycle</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Brand *</label>
          <input type="text" placeholder="Yamaha / Honda" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Model & Color *</label>
          <input type="text" placeholder="FZ-S Red" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Registration Number *</label>
          <input type="text" placeholder="DHAKA METRO-LA-XX-XXXX" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Insurance Number</label>
          <input type="text" placeholder="Optional for Cycle" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Insurance Expiry</label>
          <input type="date" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
    </div>
  );
}