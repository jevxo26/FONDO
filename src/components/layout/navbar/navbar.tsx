"use client";

import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavActions } from "./nav-actions";
import { SearchForm } from "./search-form";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-[88px] bg-background shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <div className="wrapper">
        <div className="flex h-[88px] items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-[50px]">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
                <Utensils className="size-5 text-white" />
              </div>
              <span className="text-[20px] font-bold text-foreground">
                FONDO
              </span>
            </Link>
            <nav className="hidden items-center gap-4 md:flex xl:gap-8">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[16px] font-semibold transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/75",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <SearchForm />
          <NavActions />
        </div>
      </div>
    </header>
  );
}
