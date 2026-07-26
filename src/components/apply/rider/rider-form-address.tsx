import React from "react";
import { MapPin } from "lucide-react";

export function FormAddress({ onFocus }: { onFocus: () => void }) {
  return (
    <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={onFocus}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">02</span>
          <h3 className="font-heading text-xl font-bold text-foreground">Address Details</h3>
        </div>
        <MapPin className="size-5 text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Present Address *</label>
          <textarea rows={2} placeholder="Street, House/Flat No, Area" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">City *</label>
          <select className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="sylhet">Sylhet</option>
            <option value="rajshahi">Rajshahi</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Postal Code *</label>
          <input type="text" placeholder="e.g. 1207" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Map Location Picker</label>
          <div className="h-28 rounded-xl bg-secondary border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground text-xs gap-2">
            <MapPin className="size-6 text-primary" />
            <span>Click to Pin Your Primary Operating Hub Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}