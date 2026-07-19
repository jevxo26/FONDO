"use client";

import { ShoppingBag, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/use-cart";

interface AddToCartButtonProps {
  foodId: string;
  price: number;
  quantity?: number;
}

export default function AddToCartButton({ foodId, price, quantity = 1 }: AddToCartButtonProps) {
  const addToCart = useAddToCart();

  const handleClick = () => {
    if (addToCart.isPending) return;
    addToCart.mutate({ foodId, quantity, unitPrice: price });
  };

  return (
    <Button
      variant="accent"
      onClick={handleClick}
      disabled={addToCart.isPending}
      className="mt-5 w-full justify-between rounded-full py-6 pl-5 pr-3"
    >
      <div className="flex items-center gap-2">
        {addToCart.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ShoppingBag className="size-4" />
        )}
        <span className="font-sans text-sm font-semibold tracking-wide">
          {addToCart.isPending ? "Adding..." : "Add to cart"}
        </span>
      </div>
      <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Plus className="size-4 stroke-[2.5]" />
      </div>
    </Button>
  );
}
