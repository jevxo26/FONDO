import React from "react";
import { CreditCard, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  paymentMethod: string;
  setPaymentMethod: (m: string) => void;
  agreedTerms: { terms: boolean; correctInfo: boolean; validDocs: boolean };
  setAgreedTerms: React.Dispatch<React.SetStateAction<{ terms: boolean; correctInfo: boolean; validDocs: boolean }>>;
  onFocusStep: (step: number) => void;
}

export function FormPaymentAndTerms({ paymentMethod, setPaymentMethod, agreedTerms, setAgreedTerms, onFocusStep }: Props) {
  return (
    <div className="space-y-6">
      {/* Section 09: Payment */}
      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={() => onFocusStep(9)}>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">09</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Weekly Payment Method</h3>
          </div>
          <CreditCard className="size-5 text-primary" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Bkash", "Nagad", "Rocket", "Bank Account"].map((m) => (
            <button type="button" key={m} onClick={() => setPaymentMethod(m)} className={`p-3 rounded-2xl border text-center text-xs font-bold cursor-pointer transition-all ${paymentMethod === m ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-badge)]" : "bg-card text-foreground border-border hover:bg-secondary"}`}>
              {m}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Account Number *</label>
            <input type="text" placeholder="Mobile number or Bank A/C" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-label text-muted-foreground">Account Holder Name *</label>
            <input type="text" placeholder="Name registered on account" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </div>

      {/* Section 10: Terms */}
      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={() => onFocusStep(10)}>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">10</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Terms & Legal Confirmation</h3>
          </div>
          <CheckCircle2 className="size-5 text-primary" />
        </div>
        <div className="space-y-3">
          {[
            { id: "terms", label: "I agree to the Fondo Partner Terms of Service & Privacy Policy" },
            { id: "correctInfo", label: "I confirm all provided information is accurate and legally true" },
            { id: "validDocs", label: "I hold valid driving licenses and active vehicle insurance" },
          ].map((t) => (
            <label key={t.id} className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border cursor-pointer">
              <input type="checkbox" checked={(agreedTerms as any)[t.id]} onChange={(e) => setAgreedTerms({ ...agreedTerms, [t.id]: e.target.checked })} className="mt-0.5 size-4 rounded accent-primary" />
              <span className="text-xs text-foreground font-medium">{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="button" onClick={() => alert("Application Submitted Successfully!")} className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm uppercase tracking-label hover:opacity-90 transition-all shadow-[var(--shadow-badge)] flex items-center justify-center gap-2 cursor-pointer">
        Submit Rider Application <ArrowRight className="size-5" />
      </button>
    </div>
  );
}