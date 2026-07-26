import React from "react";
import { Check } from "lucide-react";

export function RequirementsSection() {
  const requirements = [
    "Minimum Age 18 Years or Older",
    "Valid National ID or Smart NID Card",
    "Driving License (For Motorbike / Scooter)",
    "Android Smartphone (Version 8.0+)",
    "Motorbike, Scooter, or Bicycle",
    "Active Bank Account or Mobile Money (Bkash/Nagad)",
    "Basic Communication Skills",
    "Valid Residential Address Proof",
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)]">
        <div className="bg-card border border-border rounded-4xl p-8 lg:p-12 shadow-[var(--shadow-card)]">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-label text-primary">Eligibility</span>
              <h2 className="font-heading text-3xl sm:text-4xl tracking-heading text-foreground">Who Can Apply?</h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light">Ensure you meet the basic requirements below before filling out your application form.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-background border border-border rounded-2xl">
                  <div className="size-8 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                    <Check className="size-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}