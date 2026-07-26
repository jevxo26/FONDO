import React from "react";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    { name: "Rafiqul Islam", city: "Dhaka Hub", earnings: "৳48,500/mo", review: "Fondo gave me complete control over my daily schedule. I can work morning hours and spend afternoons with my family.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" },
    { name: "Tanvir Ahmed", city: "Chittagong Hub", earnings: "৳52,000/mo", review: "The weekly Friday payouts are always 100% on time. In rainy seasons, surge bonuses really boost my weekly income.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
    { name: "Sabbir Hossain", city: "Sylhet Hub", earnings: "৳45,000/mo", review: "Support is top notch. Whenever I face any issue with customer directions or orders, the 24/7 hotline resolves it in minutes.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-label text-primary">Partner Stories</span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-heading text-foreground">Hear From Our Fleet</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="size-4 fill-primary" />))}
                  </div>
                  <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-bold rounded-full uppercase">{rev.earnings}</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground font-light leading-relaxed italic">&quot;{rev.review}&quot;</p>
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <img src={rev.avatar} alt={rev.name} className="size-10 rounded-full object-cover border border-border" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">{rev.name}</h4>
                  <span className="text-[10px] text-muted-foreground">{rev.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}