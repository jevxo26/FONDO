"use client";

import { ShoppingBag, Plus } from "lucide-react";

export default function AddToCartButton() {
  return (
    <button
      onClick={() => console.log("Added item to session basket")}
      className="mt-5 flex w-full items-center justify-between rounded-full bg-[#16100C] py-3 pl-5 pr-3 text-white transition-colors hover:bg-[#2C241E] dark:bg-foreground dark:text-background"
    >
      <div className="flex items-center gap-2">
        <ShoppingBag className="size-4" />
        <span className="font-sans text-sm font-semibold tracking-wide">Add to cart</span>
      </div>
      <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[#1B0E08]">
        <Plus className="size-4 stroke-[2.5]" />
      </div>
    </button>
  );
}