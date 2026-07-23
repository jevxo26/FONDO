import React from "react";

export default function HelpDeskFaq() {
  const faqs = [
    { q: "Can I pause my subscription ritual dynamically?", a: "Yes. You can pause or adjust delivery dates via your concierge dashboard profile layout at any stage. Changes require a 24-hour processing notice." },
    { q: "How are severe ingredient allergies managed?", a: "During customized concierge configuration configuration steps, you can explicitly register severe allergies. Our dietary tracking system automatically locks macro exclusions per custom dish generation paths." },
    { q: "What parameters govern your return packaging strategy?", a: "We run a zero-waste loop. Our delivery courier retrieves the previous morning's cooled biological delivery container during your next delivery transaction window automatically." }
  ];

  return (
    <section className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="font-heading text-xl text-foreground">Heritage Help Desk</h2>
        <p className="text-[11px] text-muted-foreground/70">Common operational guidelines mapped out for easy access</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group border border-border/20 rounded-xl [&_summary::-webkit-details-marker]:hidden bg-transparent open:bg-background/30 transition-all">
            <summary className="flex items-center justify-between p-4 cursor-pointer outline-none select-none text-xs font-bold text-foreground">
              <span>{faq.q}</span>
              <span className="text-lg font-light text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/10 pt-2 animate-in fade-in duration-200">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}