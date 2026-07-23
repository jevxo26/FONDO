import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Minus, Plus, ShoppingCart } from "lucide-react";

interface Props {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  isAddToCartPending: boolean;
}

export function ProductActions({ quantity, onQuantityChange, onAddToCart, onBuyNow, isAddToCartPending }: Props) {
  return (
    <div className="mt-6 lg:col-span-6">
      <div className="flex items-center gap-4">
        <span className="font-sans text-sm font-medium text-muted-foreground">Quantity:</span>
        <div className="flex items-center border border-border bg-card rounded-xl overflow-hidden">
          <Button variant="ghost" size="icon" onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-2.5 rounded-none">
            <Minus className="size-3.5" />
          </Button>
          <span className="w-10 text-center font-sans text-sm font-semibold text-foreground select-none">{quantity}</span>
          <Button variant="ghost" size="icon" onClick={() => onQuantityChange(quantity + 1)}
            className="p-2.5 rounded-none">
            <Plus className="size-3.5" />
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">(Available)</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="outline" size="xl" onClick={onAddToCart} disabled={isAddToCartPending}
          className="gap-2 rounded-2xl border-primary bg-primary/5 text-primary hover:bg-primary/10">
          {isAddToCartPending ? <Loader2 className="size-4 animate-spin" /> : <ShoppingCart className="size-4" />}
          {isAddToCartPending ? "Adding..." : "Add to cart"}
        </Button>
        <Button variant="default" size="xl" onClick={onBuyNow} disabled={isAddToCartPending}
          className="rounded-2xl">
          Buy Now
        </Button>
      </div>

      <Button variant="outline" size="xl"
        className="mt-4 w-full gap-2 rounded-2xl border-primary/30 bg-primary/20 text-primary-foreground hover:bg-primary/30">
        <MessageSquare className="size-4 text-primary" />
        Order Directly via WhatsApp
      </Button>
    </div>
  );
}
