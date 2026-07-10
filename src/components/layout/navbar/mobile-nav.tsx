"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeMobileMenu } from "@/store/slices/uiSlice";
import { mobileNavLinks } from "@/data/navigation";

export function MobileNav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => dispatch(closeMobileMenu())}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => dispatch(closeMobileMenu())}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <Utensils className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">FONDO</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(closeMobileMenu())}
              className="size-8 rounded-full hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {mobileNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => dispatch(closeMobileMenu())}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === link.href ? "text-primary" : "text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-border p-4">
            <Link
              href="/menu"
              onClick={() => dispatch(closeMobileMenu())}
              className="flex w-full items-center justify-center rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-black/90"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
