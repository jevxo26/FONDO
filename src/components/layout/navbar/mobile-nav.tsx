"use client";

import Link from "next/link";
import { ChevronDown, House, Package, Truck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeMobileMenu } from "@/store/slices/uiSlice";
import { mainNavLinks, childIcons } from "@/data/navigation";
import { useState } from "react";
import { MobileAuthSection } from "./mobile-auth-section";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const parentIcon: Record<string, typeof House> = {
  Home: House,
  Packages: Package,
  "Track Order": Truck,
};

export function MobileNav() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
  const [expanded, setExpanded] = useState<string | null>("Foods");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setExpanded("Foods");
  }

  const toggleExpand = (label: string) => {
    setExpanded(expanded === label ? null : label);
  };

  const closeAndClear = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-50 bg-black/50" onClick={closeAndClear} />}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-background transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Logo size={40} textSize="text-lg" onClick={closeAndClear} />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={closeAndClear}
              className="size-8 rounded-full hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {mainNavLinks.map((link) => {
            const ParentIcon = link.children ? undefined : parentIcon[link.label] || House;
            const isExpanded = expanded === link.label;

            return (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => toggleExpand(link.label)}
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </Button>
                    {isExpanded && (
                      <div className="bg-muted/30">
                        {link.children.map((child) => {
                          const ChildIcon = childIcons[child.href];

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeAndClear}
                              className="flex items-center gap-3 px-4 py-2.5 pl-8 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted"
                            >
                              {ChildIcon && <ChildIcon className="size-4 shrink-0" />}
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href!}
                    onClick={closeAndClear}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {ParentIcon && <ParentIcon className="size-4 shrink-0" />}
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-4 space-y-2 pb-[calc(env(safe-area-inset-bottom)+6rem)]">
          <MobileAuthSection closeAndClear={closeAndClear} />
          <Link
            href="/foods"
            onClick={closeAndClear}
            className="flex w-full items-center justify-center rounded-full bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
}
