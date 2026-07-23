import React from "react";

export default function EngagementBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-16 text-center border-t border-b border-border/10">
      <div className="wrapper max-w-2xl mx-auto space-y-6">
        <h2 className="font-heading text-2xl md:text-4xl font-normal tracking-tight">
          Share Your Food Flow Experience
        </h2>
        <p className="font-sans text-xs sm:text-sm opacity-90 leading-relaxed font-light">
          Your feedback helps our culinary artisans keep traditional recipes alive while improving real-world kitchen distribution logistics for our community.
        </p>
        <div className="pt-2">
          <button className="px-8 py-3.5 bg-background text-foreground font-sans font-bold text-xs rounded-xl shadow-[var(--shadow-elevated)] hover:opacity-95 transition-all uppercase tracking-widest">
            Write a Review
          </button>
        </div>
        <p className="font-sans text-[9px] opacity-60 uppercase tracking-widest">
          Submission locks allocation approval tags inside database pipelines
        </p>
      </div>
    </section>
  );
}