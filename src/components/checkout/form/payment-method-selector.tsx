import { Check, CreditCard, Loader2 } from "lucide-react";
import type { PaymentMethod } from "@/hooks/use-payment-methods";

interface Props {
  value: string;
  onChange: (val: string) => void;
  methods: PaymentMethod[];
  isLoading: boolean;
}

export function PaymentMethodSelector({ value, onChange, methods, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm">
        <h2 className="font-sans text-base font-semibold text-foreground mb-4">Payment Method</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (methods.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm">
        <h2 className="font-sans text-base font-semibold text-foreground mb-4">Payment Method</h2>
        <p className="text-xs text-muted-foreground">No payment methods available.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm">
      <h2 className="font-sans text-base font-semibold text-foreground mb-4">Payment Method</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {methods.map((method) => {
          const isSelected = value === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center min-h-[84px] ${
                isSelected
                  ? "bg-foreground border-foreground text-background"
                  : "bg-background border-border text-muted-foreground hover:border-neutral-400"
              }`}
            >
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 size-4 bg-primary rounded-full flex items-center justify-center">
                  <Check className="size-2.5 text-primary-foreground stroke-[3]" />
                </div>
              )}
              <CreditCard className={`size-4 mb-1.5 ${isSelected ? "text-primary" : "text-muted-foreground/80"}`} />
              <span className="font-sans text-xs font-semibold leading-tight">{method.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
