"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="wrapper">
        {/* PAGE TITLE */}
        <div className="mb-12">
          <h1 className="font-fraunces text-4xl font-normal text-secondary-foreground tracking-tight">
            My Wishlist
          </h1>
        </div>

        {/* CENTRALIZED EMPTY STATE CARD CONTAINER */}
        <div className="max-w-[570px] mx-auto bg-card rounded-[32px] border border-border/40 py-16 px-8 text-center shadow-[var(--shadow-card)] flex flex-col items-center justify-center">
          {/* Heart Icon Wrapper with Soft Pink Tint */}
          <div className="size-14 bg-[#FDF2F4] rounded-full flex items-center justify-center mb-5 animate-pulse">
            <Heart className="size-6 text-[#E11D48] fill-[#E11D48]" />
          </div>

          {/* Typography Copy Messaging */}
          <h2 className="font-sans text-lg font-bold text-secondary-foreground tracking-tight mb-2">
            Your wishlist is empty
          </h2>

          <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed mb-8">
            Save items you love for later
          </p>

          {/* CTA Navigation Route Button */}
          <Link
            href="/menu"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-sans text-xs font-semibold text-primary-foreground transition-colors hover:bg-[#bfa052] shadow-sm"
          >
            Explore Best Sellers
          </Link>
        </div>
      </div>
    </div>
  );
}
