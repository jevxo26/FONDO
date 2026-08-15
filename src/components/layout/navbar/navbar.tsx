"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";
import { NavActions } from "./nav-actions";
import { SearchForm } from "./search-form";
import { mainNavLinks, childIcons } from "@/data/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
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
  const scrolled = useScrolled(10);

  const linkClasses = cn(
    navigationMenuTriggerStyle(),
    "text-[16px] font-semibold text-foreground/75 relative after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300",
    "transition-colors duration-300 hover:text-primary hover:after:scale-x-100 data-[active]:text-primary data-[active]:after:scale-x-100",
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-primary/10 bg-background/85 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        scrolled
          ? "shadow-[0_16px_48px_-18px_rgba(168,90,56,0.25)]"
          : "shadow-[0_12px_40px_-16px_rgba(168,90,56,0.18)]",
      )}
    >
      <div className="wrapper">
        <div className="flex h-16 items-center justify-between md:h-[88px]">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-[50px]">
            <Logo />

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-0 md:gap-1 lg:gap-2 xl:gap-3">
                {mainNavLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    {link.children ? (
                      <>
                        <NavigationMenuTrigger className={linkClasses}>
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
                      <NavigationMenuLink href={link.href!} className={linkClasses}>
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
