import React from "react";
import { Star } from "lucide-react";

export default function ReviewsDashboard() {
  const attributes = [
    { label: "Food Quality", score: "96%", desc: "Premium Freshness" },
    { label: "Culinary Genius", score: "98%", desc: "Historical Heritage" },
    { label: "Packaging", score: "94%", desc: "Eco-Cell Module" },
    { label: "Taste the History", score: "93%", desc: "Slow Simmer Profile" },
  ];

  return (
    <section className="pb-[var(--space-section)] bg-background">
      <div className="wrapper grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Score Distribution Progress Bar Matrix */}
        <div className="lg:col-span-4 bg-card border border-border/60 rounded-2xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between">
          <div className="text-center pb-4 border-b border-border/40">
            <div className="text-4xl font-heading font-normal">4.9</div>
            <div className="flex text-primary justify-center my-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
            </div>
            <span className="text-xs text-muted-foreground font-sans">Overall Rating Metric</span>
          </div>

          <div className="space-y-2 pt-4">
            {[
              { label: "5★", pct: "92%" },
              { label: "4★", pct: "6%" },
              { label: "3★", pct: "2%" },
              { label: "2★", pct: "0%" },
              { label: "1★", pct: "0%" },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-sans text-muted-foreground">
                <span className="w-4 font-medium">{row.label}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: row.pct }} />
                </div>
                <span className="w-8 text-right font-medium">{row.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Attributes Performance Metrics Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {attributes.map((attr, idx) => (
            <div key={idx} className="bg-card border border-border/60 rounded-2xl p-5 flex flex-col justify-between shadow-[var(--shadow-card)] text-center">
              <div>
                <span className="text-2xl font-heading font-normal text-primary block">{attr.score}</span>
                <h4 className="font-sans text-xs font-bold tracking-tight text-foreground mt-2">{attr.label}</h4>
                <p className="font-sans text-[10px] text-muted-foreground mt-0.5">{attr.desc}</p>
              </div>
              <div className="flex text-primary/80 justify-center gap-0.5 pt-4 border-t border-border/40 mt-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-current" />)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}