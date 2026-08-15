import { Check, CreditCard, Loader2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { PaymentMethod } from "@/store/api/slices/payments-api";

interface Props {
  value: string;
  onChange: (val: string) => void;
  methods: PaymentMethod[];
  isLoading: boolean;
}

export function PaymentMethodSelector({ value, onChange, methods, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="size-4 text-primary" />
          <h2 className="font-sans text-sm font-semibold text-foreground">Payment Method</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (methods.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="size-4 text-primary" />
          <h2 className="font-sans text-sm font-semibold text-foreground">Payment Method</h2>
        </div>
        <p className="text-xs text-muted-foreground">No payment methods available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="size-4 text-primary" />
        <h2 className="font-sans text-sm font-semibold text-foreground">Payment Method</h2>
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-3.5 text-muted-foreground/60 ml-auto cursor-help" />
          </TooltipTrigger>
          <TooltipContent>Select your preferred payment method</TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {methods.map((method) => {
          const isSelected = value === method.id;
          return (
            <Tooltip key={method.id}>
              <TooltipTrigger>
                <button
                  type="button"
                  onClick={() => onChange(method.id)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] text-center min-h-[84px] ${
                    isSelected
                      ? "bg-foreground border-foreground text-background shadow-lg"
                      : "bg-background border-border text-muted-foreground hover:border-foreground/20 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 size-4 bg-primary rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(168,90,56,0.3)]">
                      <Check className="size-2.5 text-primary-foreground stroke-[3]" />
                    </div>
                  )}
                  <CreditCard
                    className={`size-4 mb-1.5 ${isSelected ? "text-primary" : "text-muted-foreground/80"}`}
                  />
                  <span className="font-sans text-xs font-semibold leading-tight">{method.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{method.name}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
