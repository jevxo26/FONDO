import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    { q: "How long does the application process take?", a: "Most applications are reviewed and approved within 24 to 48 hours once all valid documents are submitted." },
    { q: "What documents do I need to start delivering?", a: "You need a valid National ID or Smart Card, Driving License (for Motorbikes/Scooters), Vehicle Registration, and an active bank or mobile money account." },
    { q: "How and when do I get paid?", a: "Fondo processes earnings every single Friday directly to your preferred Bkash, Nagad, Rocket, or Bank account with zero transfer fees." },
    { q: "Can I choose my own delivery zones and working hours?", a: "Yes! Fondo gives you 100% freedom to schedule your shifts and pick your preferred operating areas in your city." },
    { q: "What kind of vehicle can I use for deliveries?", a: "You can deliver with a Bicycle, Electric Scooter, or Motorbike. Ensure your motor vehicle has valid registration and insurance." },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-label text-primary">Have Questions?</span>
            <h2 className="font-heading text-3xl sm:text-5xl tracking-heading text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-card)] transition-colors">
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-foreground cursor-pointer">
                  <span>{faq.q}</span>
                  <ChevronDown className={`size-5 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0 text-xs text-muted-foreground font-light leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}