"use client";

import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="group relative flex flex-col sm:flex-row gap-5 rounded-[28px] bg-white p-5 border border-border/40 shadow-[var(--shadow-card)] dark:bg-card transition-all hover:border-border/80">
      
      {/* Left Area: Product Square Media Box */}
      <div className="relative aspect-square w-full sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-muted">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-102"
        />
      </div>

      {/* Middle/Right Area: Details & Actions Grid */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-sans text-base font-semibold tracking-tight text-secondary-foreground">
              {item.title}
            </h3>
            
            {/* Price Stack Section */}
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-sans text-base font-bold text-secondary-foreground">৳{item.price}</span>
              {item.oldPrice && (
                <span className="font-sans text-xs text-muted-foreground line-through">৳{item.oldPrice}</span>
              )}
            </div>
            
            <p className="mt-1 font-sans text-[11px] text-muted-foreground">
              {item.itemsSold} sold
            </p>
          </div>

          {/* Delete Action Item Top Corner */}
          <button 
            onClick={() => onRemove(item.id)}
            className="text-muted-foreground/60 transition-colors hover:text-destructive p-1"
          >
            <Trash2 className="size-4 stroke-[2]" />
          </button>
        </div>

        {/* Counter controls + Final localized price tracking inline */}
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="flex items-center border border-border bg-white rounded-xl overflow-hidden dark:bg-muted/10">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="px-2.5 py-1.5 text-muted-foreground hover:bg-muted dark:hover:bg-muted/20 transition-colors"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-8 text-center font-sans text-xs font-semibold text-foreground select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-2.5 py-1.5 text-muted-foreground hover:bg-muted dark:hover:bg-muted/20 transition-colors"
            >
              <Plus className="size-3" />
            </button>
          </div>

          {/* Dynamic line calculation display text */}
          <span className="font-sans text-base font-bold text-secondary-foreground">
            ৳{item.price * item.quantity}
          </span>
        </div>
      </div>

    </div>
  );
}