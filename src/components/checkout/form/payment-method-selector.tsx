import { Check, CreditCard } from "lucide-react";

const METHODS = [
  { id: "online", label: "Online Card" },
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "cod", label: "Cash on Delivery" },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function PaymentMethodSelector({ value, onChange }: Props) {
  return (
    <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm">
      <h2 className="font-sans text-base font-semibold text-foreground mb-4">Payment Method</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {METHODS.map((method) => {
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
              <span className="font-sans text-xs font-semibold leading-tight">{method.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
