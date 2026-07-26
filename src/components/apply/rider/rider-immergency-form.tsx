import React from "react";
import { Phone, ShieldCheck } from "lucide-react";

export function FormEmergencyAndDriving({ onFocusStep }: { onFocusStep: (s: number) => void }) {
  return (
    <div className="space-y-6">
      {/* Section 03: Emergency Contact */}
      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={() => onFocusStep(3)}>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">03</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Emergency Contact</h3>
          </div>
          <Phone className="size-5 text-primary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Contact Name *</label>
            <input type="text" placeholder="Relative name" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Emergency Phone *</label>
            <input type="tel" placeholder="017XXXXXXXX" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Relationship *</label>
            <select className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="parent">Parent</option>
              <option value="spouse">Spouse</option>
              <option value="sibling">Sibling</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 04: Driving Information */}
      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={() => onFocusStep(4)}>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">04</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Driving License Info</h3>
          </div>
          <ShieldCheck className="size-5 text-primary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">License Number *</label>
            <input type="text" placeholder="DL Number" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Expiry Date *</label>
            <input type="date" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Experience (Years) *</label>
            <input type="number" placeholder="e.g. 2" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}