"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Menu, Package, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { openMobileMenu, toggleSearch } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/store/store";
import { useCart } from "@/store/api/slices/cart-api";

const items = [
  { href: "/", label: "Home", icon: House },
  { action: "search", label: "Search", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/orders", label: "Orders", icon: Package },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: cart } = useCart();

  const cartCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex w-full max-w-lg items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const Icon = item.icon;
          const active = "href" in item && isActive(item.href);

          if ("action" in item) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => dispatch(toggleSearch())}
                className="flex flex-1 flex-col items-center gap-0.5 py-1.5 text-muted-foreground"
              >
                <span className="flex size-9 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-1.5"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5" />
                {item.href === "/cart" && cartCount > 0 && (
                  <span className="absolute top-1 left-1/2 ml-3 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground leading-none">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold transition-colors duration-300",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => dispatch(openMobileMenu())}
          className="flex flex-1 flex-col items-center gap-0.5 py-1.5 text-muted-foreground"
        >
          <span className="flex size-9 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground">
            <Menu className="size-5" />
          </span>
          <span className="text-[10px] font-semibold">Menu</span>
        </button>
      </div>
    </nav>
  );
}
