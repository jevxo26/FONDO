import React from "react";

export default function HelpDeskFaq() {
  const faqs = [
    { q: "Can I pause my subscription ritual dynamically?", a: "Yes. You can pause or adjust delivery dates via your concierge dashboard profile layout at any stage. Changes require a 24-hour processing notice." },
    { q: "How are severe ingredient allergies managed?", a: "During customized concierge configuration configuration steps, you can explicitly register severe allergies. Our dietary tracking system automatically locks macro exclusions per custom dish generation paths." },
    { q: "What parameters govern your return packaging strategy?", a: "We run a zero-waste loop. Our delivery courier retrieves the previous morning's cooled biological delivery container during your next delivery transaction window automatically." }
  ];

  return (
    <section className="bg-white border border-[#d7c3b2]/20 rounded-[2rem] p-6 lg:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="font-serif text-xl text-[#1e1b17]">Heritage Help Desk</h2>
        <p className="text-[11px] text-[#524437]/70">Common operational guidelines mapped out for easy access</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group border border-[#d7c3b2]/20 rounded-xl [&_summary::-webkit-details-marker]:hidden bg-transparent open:bg-[#fff8f3]/30 transition-all">
            <summary className="flex items-center justify-between p-4 cursor-pointer outline-none select-none text-xs font-bold text-[#1e1b17]">
              <span>{faq.q}</span>
              <span className="text-lg font-light text-[#524437] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 text-xs text-[#524437] leading-relaxed border-t border-[#d7c3b2]/10 pt-2 animate-in fade-in duration-200">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}