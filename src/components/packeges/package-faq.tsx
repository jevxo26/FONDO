import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function PackagesFaq() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Can I swap out specific meals if I dislike them?", a: "Yes. All customizable plans include component replacement options inside your portal 24 hours prior to dispatch." },
    { q: "How are thermal shipping chain variables handled?", a: "Meals are packed in temperature-controlled insulation cells to lock in absolute freshness during transit." },
    { q: "Am I allowed to freeze or pause my current subscription?", a: "Completely. You can suspend delivery schedules via your dashboard with zero financial penalty." }
  ];

  return (
    <section className="wrapper pb-20 max-w-3xl mx-auto">
      <div className="text-center mb-8 flex flex-col items-center">
        <HelpCircle className="size-6 text-primary mb-2" />
        <h2 className="font-heading text-2xl text-foreground font-normal">Subscription FAQs</h2>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <div key={index} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-xs text-foreground outline-none">
                <span>{faq.q}</span>
                <ChevronDown className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 border-t border-border/40" : "max-h-0"}`}>
                <p className="p-4 text-[11px] text-muted-foreground leading-relaxed bg-background/30">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}