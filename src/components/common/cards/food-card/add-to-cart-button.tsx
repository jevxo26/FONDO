'use client';

import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AddToCartButton() {
  return (
    <Button
      variant="accent"
      onClick={() => console.log('Added item to session basket')}
      className="mt-5 w-full justify-between rounded-full py-6 pl-5 pr-3"
    >
      <div className="flex items-center gap-2">
        <ShoppingBag className="size-4" />
        <span className="font-sans text-sm font-semibold tracking-wide">Add to cart</span>
      </div>
      <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Plus className="size-4 stroke-[2.5]" />
      </div>
    </Button>
  );
}
