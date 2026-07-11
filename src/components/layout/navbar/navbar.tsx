"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { NavActions } from "./nav-actions";
import { SearchForm } from "./search-form";
import { mainNavLinks, childIcons } from "@/data/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <div className="wrapper">
        <div className="flex h-16 items-center justify-between md:h-[88px]">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-[50px]">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="FONDO logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-[20px] font-bold text-foreground">FONDO</span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-0 md:gap-1 lg:gap-2 xl:gap-3">
                {mainNavLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    {link.children ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-[16px] font-semibold text-foreground/75",
                          )}
                        >
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-56 gap-1 p-2">
                            {link.children.map((child) => {
                              const ChildIcon = childIcons[child.href];

                              return (
                                <li key={child.href}>
                                  <NavigationMenuLink
                                    href={child.href}
                                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                  >
                                    {ChildIcon && <ChildIcon className="size-4 shrink-0" />}
                                    {child.label}
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={link.href!}
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "text-[16px] font-semibold text-foreground/75",
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2 lg:gap-2">
            <SearchForm />
            <NavActions />
          </div>
        </div>
      </div>
    </header>
  );
}
