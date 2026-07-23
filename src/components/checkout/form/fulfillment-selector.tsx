import { ShoppingBag, Truck } from "lucide-react";

interface Props {
  value: "delivery" | "pickup";
  onChange: (val: "delivery" | "pickup") => void;
}

export function FulfillmentSelector({ value, onChange }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm">
      <h2 className="font-sans text-base font-semibold text-foreground mb-4">
        How would you like your order?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className={`flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                isSelected
                  ? "bg-foreground border-foreground text-background"
                  : "bg-background border-border text-foreground"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl ${isSelected ? "bg-primary/20" : "bg-white border"}`}
              >
                <Icon
                  className={`size-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold">{opt.label}</p>
                <p
                  className={`font-sans text-xs ${isSelected ? "text-neutral-300" : "text-muted-foreground"}`}
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
