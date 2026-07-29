import { ShoppingBag, Truck, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  value: "delivery" | "pickup";
  onChange: (val: "delivery" | "pickup") => void;
}

export function FulfillmentSelector({ value, onChange }: Props) {
  return (
    <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="size-4 text-primary" />
        <h2 className="font-sans text-sm font-semibold text-foreground">
          How would you like your order?
        </h2>
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-3.5 text-muted-foreground/60 ml-auto cursor-help" />
          </TooltipTrigger>
          <TooltipContent>Choose delivery or pickup</TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { id: "delivery", label: "Delivery", desc: "Get it delivered to your door", icon: Truck },
          {
            id: "pickup",
            label: "Pick up",
            desc: "Collect directly from kitchen",
            icon: ShoppingBag,
          },
        ].map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id as "delivery" | "pickup")}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] border text-left ${
                isSelected
                  ? "bg-foreground border-foreground text-background shadow-lg"
                  : "bg-background border-border text-foreground hover:border-foreground/20 hover:shadow-sm"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl transition-all ${
                  isSelected ? "bg-primary/20" : "bg-card border"
                }`}
              >
                <Icon
                  className={`size-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold">{opt.label}</p>
                <p
                  className={`font-sans text-xs ${
                    isSelected ? "text-neutral-300" : "text-muted-foreground"
                  }`}
                >
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
