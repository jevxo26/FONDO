"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/use-cart";
import { Check, Plus, ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
  foodId: string;
  name: string;
  thumbnail?: string;
  price: number;
  quantity?: number;
}

export default function AddToCartButton({
  foodId,
  name,
  thumbnail,
  price,
  quantity = 1,
}: AddToCartButtonProps) {
  const [justAdded, setJustAdded] = useState(false);
  const addToCart = useAddToCart();

  const handleClick = () => {
    if (justAdded) return;
    setJustAdded(true);
    addToCart.mutate({ foodId, name, thumbnail, quantity, unitPrice: price });
    setTimeout(() => setJustAdded(false), 400);
  };

  return (
    <Button
      variant="accent"
      onClick={handleClick}
      disabled={justAdded}
      className="mt-5 w-full justify-between rounded-full py-6 pl-5 pr-3"
    >
      <div className="flex items-center gap-2">
        {justAdded ? (
          <Check className="size-4" />
        ) : (
          <ShoppingBag className="size-4" />
        )}
        <span className="font-sans text-sm font-semibold tracking-wide">
          {justAdded ? "Added" : "Add to cart"}
        </span>
      </div>
      <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Plus className="size-4 stroke-[2.5]" />
      </div>
    </Button>
  );
}
