import React from "react";
import { Star } from "lucide-react";

export default function ChroniclesReviews() {
  const reviews = [
    { name: "A. Rahman", rating: 5, date: "2 days ago", comment: "The caloric precision coupled with authentic regional flavor balance is remarkable. Lost 3kg sustainably over my 30-day framework." },
    { name: "S. Khan", rating: 4, date: "1 week ago", comment: "Exceptional fish dishes. The delivery updates are highly accurate, and the eco-cell retrieval framework works flawlessly." }
  ];

  return (
    <section className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="font-heading text-xl text-foreground">Verified Chronicles</h2>
        <p className="text-[11px] text-muted-foreground/70">Authentic testaments from our active collective community</p>
      </div>

      {/* Aggregate rating visualization bar chart */}
      <div className="bg-background rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="text-center sm:text-left">
          <div className="text-3xl font-heading font-bold text-foreground">4.9</div>
          <div className="flex text-primary justify-center sm:justify-start my-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-current" />)}
          </div>
          <span className="text-[10px] text-muted-foreground/60">Based on 120+ active subscriptions</span>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          {[
            { stars: 5, pct: "92%" },
            { stars: 4, pct: "6%" },
            { stars: 3, pct: "2%" }
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="w-3 text-right">{row.stars}</span>
              <div className="flex-1 h-1.5 bg-border/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: row.pct }} />
              </div>
              <span className="w-6 text-right text-muted-foreground/60">{row.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards mapping logic */}
      <div className="space-y-4">
        {reviews.map((rev, idx) => (
          <div key={idx} className="border-b border-border/20 pb-4 last:border-none last:pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {rev.name[0]}
                </div>
                <span className="text-xs font-bold text-foreground">{rev.name}</span>
              </div>
              <span className="text-[10px] text-muted-foreground/50">{rev.date}</span>
            </div>
            <p className="text-xs text-muted-foreground/90 leading-relaxed font-sans pl-8">{rev.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}