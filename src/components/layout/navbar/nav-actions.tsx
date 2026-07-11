'use client';

import { useAppDispatch } from '@/store/store';
import { toggleMobileMenu } from '@/store/slices/uiSlice';
import { Heart, Menu, ShoppingCart, Truck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NavActions() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/wishlist"
        className="flex size-9 items-center justify-center rounded-full bg-destructive/20 transition-colors hover:bg-destructive/30"
      >
        <Heart className="size-4 text-foreground" />
      </Link>
      <Link
        href="/cart"
        className="flex size-9 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary"
      >
        <ShoppingCart className="size-4 text-foreground" />
      </Link>
      <Link
        href="/track-order"
        className="hidden items-center gap-2 rounded-[8px] bg-foreground px-4 py-2 text-[16px] font-bold text-secondary transition-colors hover:bg-foreground/90 lg:flex"
      >
        <Truck className="size-5 text-secondary" />
        Track Order
      </Link>
      <Link
        href="/menu"
        className="hidden rounded-[8px] bg-foreground px-4 py-2 text-[14px] font-medium text-secondary transition-colors hover:bg-foreground/90 lg:block"
      >
        Order Now
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(toggleMobileMenu())}
        className="rounded-full hover:bg-black/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>
    </div>
  );
}
