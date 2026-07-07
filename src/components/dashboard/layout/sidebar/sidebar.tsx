"use client";

import { Headphones, Utensils, X } from "lucide-react";
import Link from "next/link";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebar } from "../sidebar-context";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto border-r border-border bg-background px-4 py-8 shadow-sm transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-10 flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <Utensils className="size-5 text-white" />
            </div>
            <div>
              <h1 className="font-fraunces text-xl font-bold text-foreground">
                FONDO
              </h1>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Admin Panel
              </p>
            </div>
          </Link>
          <button
            onClick={close}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <SidebarMenu onItemClick={close} />

        <div className="mt-auto border-t border-border pt-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95">
            <Headphones className="size-[18px]" />
            Support Dashboard
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={close}
        />
      )}
    </>
  );
}
