import React from "react";
import { Star } from "lucide-react";
import { RIDER_TESTIMONIALS } from "./riderdata";
import Image from "next/image";
export function RiderTestimonialsSection() {
  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Fleet Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
            Hear From Our Riders
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RIDER_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-primary" />
                    ))}
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">
                    {item.earnings}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground font-light italic">
                  &quot;{item.review}&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <Image
                  width={500}
                  height={500}
                  src={item.img}
                  alt={item.name}
                  className="size-11 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    {item.zone} • {item.vehicle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
