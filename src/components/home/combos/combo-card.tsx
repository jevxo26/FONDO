import { ArrowRight, Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ComboCardProps {
  combo: {
    id: number;
    title: string;
    serves: string;
    popular: boolean;
    saveAmount: number | null;
    items: string[];
    freeDrink: boolean;
    price: number;
  };
  className?: string;
}

export function ComboCard({ combo, className }: ComboCardProps) {
  return (
    <div
      className={cn(
        "flex w-[80vw] shrink-0 flex-col rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:w-[289px] snap-start active:scale-[0.98] transition-transform duration-200",
        className,
      )}
    >
      {/* Top row: serves + badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-normal uppercase tracking-wider text-foreground/55">
          Serves {combo.serves}
        </span>
        {combo.popular ? (
          <Badge variant="default" className="uppercase">
            Most Popular
          </Badge>
        ) : combo.saveAmount ? (
          <Badge variant="outline" className="bg-primary/15 text-primary border-primary/20 uppercase">
            Save ৳{combo.saveAmount}
          </Badge>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-foreground">
        {combo.title}
      </h3>

      {/* Items list */}
      <ul className="mt-4 flex flex-col gap-2">
        {combo.items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <div className="flex size-3.5 shrink-0 items-center justify-center rounded-full border border-primary">
              <Check className="size-2 text-primary" strokeWidth={3} />
            </div>
            <span className="text-sm text-foreground/65">{item}</span>
          </li>
        ))}
      </ul>

      {/* Free drink */}
      {combo.freeDrink && (
        <div className="mt-3 flex items-center gap-1.5 text-sm text-foreground/65">
          <Flame className="size-3.5 text-primary" />
          Free drink included
        </div>
      )}

      {/* Spacer */}
      <div className="mt-auto" />

      {/* Bottom row: price + button */}
      <div className="mt-6 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-heading text-2xl font-bold text-foreground">
            ৳{combo.price}
          </span>
          <span className="text-xs text-foreground/45">all inclusive</span>
        </div>
        <Button
          variant="accent"
          className="gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide h-auto"
          nativeButton={false}
          render={<Link href="/foods" />}
        >
          Order Combo
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
