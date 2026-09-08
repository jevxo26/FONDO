"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RIDER_FAQS } from "./riderdata";
export function RiderFaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section className="py-(--space-section) bg-background border-b border-border">
      <div className="wrapper px-(--space-container) space-y-12 max-w-4xl">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Rider Assistance
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {RIDER_FAQS.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-card)]"
              >
                <Button
                  variant="ghost"
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left justify-start"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </Button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
