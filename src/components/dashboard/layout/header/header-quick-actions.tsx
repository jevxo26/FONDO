"use client";

import { Fragment } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, Plus, Receipt, Store, Utensils } from "lucide-react";

const actions = [
  { label: "New Food Item", desc: "Add a new food to the catalog", icon: Utensils, key: "New Food" },
  { label: "New Vendor", desc: "Register a new vendor account", icon: Store, key: "New Vendor" },
  { label: "New Order", desc: "Create a manual customer order", icon: Receipt, key: "New Order" },
  { label: "New Package", desc: "Create a new meal package", icon: Package, key: "New Package" },
];

export function HeaderQuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className:
            "rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold px-2 py-1.5 h-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/12 hover:border-primary/40 active:scale-[0.97] sm:px-4",
        })}
      >
        <Plus className="size-3.5" />
        <span className="hidden sm:inline">New</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Quick Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.key}
              onClick={() => console.log(action.key)}
              className="flex items-center gap-3 py-2.5"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                <action.icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-[11px] text-muted-foreground">{action.desc}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
