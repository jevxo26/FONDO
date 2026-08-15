"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Menu, Package, ShoppingBag, Truck, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { toggleMobileMenu } from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useCart } from "@/store/api/slices/cart-api";
import { useAuth } from "@/hooks/use-auth";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/track-order", label: "Track Order", icon: Truck },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/orders", label: "Orders", icon: Package },
] as const;

const emptySubscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

export function BottomNav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { data: cart } = useCart(!isAuthenticated);
  const mounted = useHydrated();
  const isMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  const cartCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  const isActive = (href: string) => mounted && pathname === href;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex w-full max-w-lg items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

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
                <motion.span
                  key={`icon-${item.href}-${cartCount}`}
                  animate={
                    item.href === "/cart" && cartCount > 0
                      ? { scale: [1, 1.35, 0.9, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  <Icon className="size-5" />
                </motion.span>
                {item.href === "/cart" && cartCount > 0 && (
                  <motion.span
                    key={`cart-badge-${cartCount}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-0.5 left-1/2 ml-3 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-primary px-[5px] text-[11px] font-bold text-primary-foreground leading-none ring-2 ring-background"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
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
          onClick={() => dispatch(toggleMobileMenu())}
          className="flex flex-1 flex-col items-center gap-0.5 py-1.5"
        >
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              isMenuOpen
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="relative size-5">
              <AnimatePresence initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold transition-colors duration-300",
              isMenuOpen ? "text-primary" : "text-muted-foreground",
            )}
          >
            Menu
          </span>
        </button>
      </div>
    </nav>
  );
}
