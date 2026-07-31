"use client";

import { ArrowRight, Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ComboCardProps {
  combo: {
    id: number;
    title: string;
    serves: string;
    popular: boolean;
    saveAmount: number | null;
    image: string;
    items: string[];
    freeDrink: boolean;
    price: number;
  };
  index?: number;
  className?: string;
}

const tierConfig = [
  {
    label: "Gold",
    badge: "bg-primary text-primary-foreground",
    icon: "✦",
  },
  {
    label: "Silver",
    badge: "bg-slate-600/90 text-slate-100",
    icon: "✦",
  },
  {
    label: "Bronze",
    badge: "bg-amber-800/90 text-amber-100",
    icon: "✦",
  },
  {
    label: "Platinum",
    badge: "bg-violet-700/90 text-violet-100",
    icon: "✦",
  },
];

export function ComboCard({ combo, index = 0, className }: ComboCardProps) {
  const tier = tierConfig[index % tierConfig.length];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30",
        className,
      )}
    >
      <div className="absolute top-0 left-0 right-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Image header */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={combo.image}
          alt={combo.title}
          fill
          sizes="(max-width: 640px) 80vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-[var(--shadow-card)]", tier.badge)}>
            {tier.icon} {tier.label}
          </span>
        </div>

        {combo.saveAmount && (
          <span className="absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold text-primary backdrop-blur-sm shadow-[var(--shadow-card)]">
            Save ৳{combo.saveAmount}
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Serves {combo.serves}
          </span>
          {combo.popular && (
            <Badge variant="default" className="text-[10px] uppercase bg-primary text-primary-foreground">
              Most Popular
            </Badge>
          )}
        </div>

        <h3 className="mt-2 font-heading text-xl font-semibold leading-tight text-foreground">
          {combo.title}
        </h3>

        <ul className="mt-3 flex flex-col gap-1.5">
          {combo.items.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <div className="flex size-4 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10">
                <Check className="size-2 text-primary" strokeWidth={3} />
              </div>
              <span className="text-sm text-foreground/70">{item}</span>
            </li>
          ))}
        </ul>

        {combo.freeDrink && (
          <div className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-xs text-primary">
            <Flame className="size-3" />
            Free drink included
          </div>
        )}

        <div className="mt-auto min-h-3" />
        <div className="flex items-end justify-between border-t border-border/50 pt-3">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground block">
              Price
            </span>
            <span className="font-heading text-2xl font-bold text-foreground">৳{combo.price}</span>
          </div>
          <Button
            variant="accent"
            className="group/btn gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide h-auto"
            nativeButton={false}
            render={<Link href="/foods" />}
          >
            Order
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/btn:translate-x-0.5">
              <ArrowRight className="size-3.5" />
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
