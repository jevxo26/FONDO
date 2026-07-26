import React from "react";
import { User } from "lucide-react";

export function FormPersonalInfo({ onFocus }: { onFocus: () => void }) {
  return (
    <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={onFocus}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">01</span>
          <h3 className="font-heading text-xl font-bold text-foreground">Personal Information</h3>
        </div>
        <User className="size-5 text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Full Name *</label>
          <input type="text" placeholder="Enter your full legal name" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Phone Number *</label>
          <input type="tel" placeholder="017XXXXXXXX" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Email Address *</label>
          <input type="email" placeholder="name@example.com" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Date of Birth *</label>
          <input type="date" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Gender *</label>
          <select className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">National ID (NID) Number *</label>
          <input type="text" placeholder="10, 13, or 17 digit NID number" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
    </div>
  );
}