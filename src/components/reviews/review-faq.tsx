import React from "react";

export default function ReviewFaq() {
  const faqs = [
    { q: "How do you verify review authenticity?", a: "Every single published review loop requires tokenized database verification tying back to active subscription transactions. Anonymous accounts cannot commit submissions." },
    { q: "Are negative reviews moderated?", a: "No. In alignment with our transparency protocols, all scores from 1 to 5 stars are processed directly inside the public dashboard layout engine without filter delays." },
    { q: "Can I edit my review scores later?", a: "Yes. You can re-authenticate your survey records via your secure personal account interface layout at any point if parameters change." },
    { q: "What happens if a coupon code fails?", a: "Our automated checkout framework computes allocation pricing live. Any manual adjustments can be logged instantly via the support channel." }
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-t border-border/20">
      <div className="wrapper max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="font-heading text-xl md:text-3xl font-normal text-foreground">Common Questions About Reviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card border border-border/40 rounded-xl p-5 space-y-2 shadow-sm">
              <h4 className="font-heading text-sm font-medium text-foreground">{faq.q}</h4>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}