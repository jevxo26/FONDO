"use client";

import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemove: (id: string) => void;
  isQtyUpdating?: boolean;
  isDeleting?: boolean;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  isQtyUpdating,
  isDeleting,
}: CartItemCardProps) {
  return (
    <div className="group relative flex flex-col sm:flex-row gap-5 rounded-[28px] bg-card p-5 border border-border/40 shadow-[var(--shadow-card)] transition-all hover:border-border/80">
      <div className="relative aspect-square w-full sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-muted">
        {item.food.thumbnail ? (
          <Image
            src={item.food.thumbnail}
            alt={item.food.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-102"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-sans text-base font-semibold tracking-tight text-secondary-foreground">
              {item.food.name}
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-sans text-base font-bold text-secondary-foreground">
                ৳{Number(item.unitPrice)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onRemove(item.id)}
            disabled={isQtyUpdating || isDeleting}
            className="text-muted-foreground/60 hover:text-destructive"
          >
            <Trash2 className="size-4 stroke-[2]" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="flex items-center border border-border bg-white rounded-xl overflow-hidden dark:bg-muted/10">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={isQtyUpdating || isDeleting}
              className="rounded-none px-2.5"
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center font-sans text-xs font-semibold text-foreground select-none">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={isQtyUpdating || isDeleting}
              className="rounded-none px-2.5"
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <span className="font-sans text-base font-bold text-secondary-foreground">
            ৳{Number(item.unitPrice) * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
